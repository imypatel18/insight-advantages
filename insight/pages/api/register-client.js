import { getConnection } from '../../lib/db'; // Fixed path: pages/api -> lib
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    fullName,
    email,
    password,
    companyName,
    companyWebsite,
    industry,
    companySize,
    location,
    role,
    useCase,
    phoneNumber,
    hearAboutUs,
    acceptTerms
  } = req.body;

  // 🔍 Basic validation
  if (
    !fullName || !email || !password || !companyName ||
    !industry || !companySize || !location || !role ||
    !useCase || !acceptTerms
  ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const pool = await getConnection();

    // 🔐 Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool
      .request()
      .input('FullName', fullName)
      .input('Email', email)
      .input('Password', hashedPassword)
      .input('CompanyName', companyName)
      .input('CompanyWebsite', companyWebsite || null)
      .input('Industry', industry)
      .input('CompanySize', companySize)
      .input('Location', location)
      .input('Role', role)
      .input('UseCase', useCase)
      .input('PhoneNumber', phoneNumber || null)
      .input('HearAboutUs', hearAboutUs || null)
      .input('AcceptTerms', acceptTerms ? 1 : 0)
      .query(`
        INSERT INTO Clients (
          FullName, Email, Password, CompanyName, CompanyWebsite,
          Industry, CompanySize, Location, Role, UseCase,
          PhoneNumber, HearAboutUs, AcceptTerms
        )
        VALUES (
          @FullName, @Email, @Password, @CompanyName, @CompanyWebsite,
          @Industry, @CompanySize, @Location, @Role, @UseCase,
          @PhoneNumber, @HearAboutUs, @AcceptTerms
        );
      `);

    return res.status(201).json({ message: 'Client registered successfully' });

  } catch (error) {
    console.error('❌ Client registration error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
