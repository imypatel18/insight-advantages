import { getConnection } from '../../lib/db'; // Adjust if your DB util path differs
import bcrypt from 'bcrypt';


export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const data = req.body;

  try {
    const pool = await getConnection();

    // ✅ Pre-check if email already exists
    const existing = await pool.request()
      .input('Email', data.email.toLowerCase())
      .query('SELECT 1 FROM Consultants WHERE Email = @Email');

    if (existing.recordset.length > 0) {
      return res.status(409).json({ error: 'A consultant with this email already exists.' });
    }

    // ✅ Hash password (default from signup form)
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // ✅ Insert main consultant info
    const insertConsultant = await pool.request()
      .input('FullName', data.fullName)
      .input('Email', data.email.toLowerCase())
      .input('PhoneNumber', data.phoneNumber)
      .input('Location', data.location)
      .input('PreferredWorkType', data.preferredWorkType)
      .input('PreferredWorkMode', data.preferredWorkMode)
      .input('Specialization', data.specialization)
      .input('YearsOfExperience', data.yearsOfExperience)
      .input('PrimarySkills', data.primarySkills)
      .input('AvailableServices', data.availableServices)
      .input('PreferredWorkingHours', data.preferredWorkingHours)
      .input('ConsultingMode', data.consultingMode)
      .input('PricingStructure', data.pricingStructure)
      .input('PaymentPreferences', data.paymentPreferences)
      .input('BriefBio', data.briefBio)
      .input('Password', hashedPassword)
      .query(`
        INSERT INTO Consultants (
          FullName, Email, PhoneNumber, Location, PreferredWorkType, PreferredWorkMode,
          Specialization, YearsOfExperience, PrimarySkills, AvailableServices,
          PreferredWorkingHours, ConsultingMode, PricingStructure, PaymentPreferences,
          BriefBio, Password
        )
        OUTPUT INSERTED.ConsultantID
        VALUES (
          @FullName, @Email, @PhoneNumber, @Location, @PreferredWorkType, @PreferredWorkMode,
          @Specialization, @YearsOfExperience, @PrimarySkills, @AvailableServices,
          @PreferredWorkingHours, @ConsultingMode, @PricingStructure, @PaymentPreferences,
          @BriefBio, @Password
        );
      `);

    const consultantId = insertConsultant.recordset[0].ConsultantID;

    // 🔁 Helper to insert arrays into related tables
    const insertArray = async (array, tableName, columns) => {
      for (const item of array) {
        const request = pool.request().input('ConsultantID', consultantId);
        columns.forEach(col => request.input(col, item[col]));
        await request.query(`
          INSERT INTO ${tableName} (ConsultantID, ${columns.join(', ')})
          VALUES (@ConsultantID, ${columns.map(col => `@${col}`).join(', ')});
        `);
      }
    };

    await insertArray(data.languagesSpoken.map(lang => ({ Language: lang })), 'LanguagesSpoken', ['Language']);
    await insertArray(data.education, 'Education', ['Degree', 'Institution', 'Year']);
    await insertArray(data.professionalExperience, 'ProfessionalExperience', ['Role', 'Company', 'Years']);
    await insertArray(data.certificates, 'Certificates', ['Name']);

    return res.status(200).json({ message: 'Consultant registered successfully!' });

  } catch (err) {
    // 💥 Handle known SQL error for unique key
    if (err.number === 2627) {
      return res.status(409).json({ error: 'A consultant with this email already exists.' });
    }

    console.error('Consultant registration failed:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
