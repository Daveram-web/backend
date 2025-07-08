import db from "../db/db.js";
import {
  hashCompare,
  hashGenerator,
  tokenGenerate,
} from "../middleware/auth.js";

export const emailVerification = async (req, res) => {
  try {
    const { email, type } = req.body;
    const [existing] = await db.query("SELECT id FROM user WHERE email = ?", [
      email,
    ]);
    if (existing.length > 0 && type === "1") {
      return res.status(409).json({ message: "Email already registered" });
    } else if (existing.length === 0 && type === "2") {
      return res.status(409).json({ message: "Email is not registered" });
    } else {
      const createotp = Math.floor(1000 + Math.random() * 9000).toString();

      const expiry_time = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes

      function formatToMySQLDateTime(date) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const hh = String(date.getHours()).padStart(2, "0");
        const min = String(date.getMinutes()).padStart(2, "0");
        const ss = String(date.getSeconds()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
      }

      const formatted = formatToMySQLDateTime(expiry_time);
      console.log("formatted expiry time:", formatted);

      let result;

      if (type === "1") {
        const [checkUser] = await db.query(
          "SELECT * FROM signup WHERE email = ?",
          [email]
        );

        if (checkUser.length === 0) {
          const [insert] = await db.query(
            "INSERT INTO signup (email, code, expires_at) VALUES (?, ?, ?)",
            [email, createotp, formatted]
          );
          result = insert.affectedRows ? 1 : 0;
        } else {
          const [update] = await db.query(
            "UPDATE signup SET code = ?, expires_at = ? WHERE email = ?",
            [createotp, formatted, email]
          );
          result = update.affectedRows ? 1 : 0;
        }
      } else if (type === "2") {
        const [update] = await db.query(
          "UPDATE user SET otp = ?, otp_expirity = ? WHERE email = ?",
          [createotp, formatted, email]
        );
        result = update.affectedRows ? 1 : 0;
      }

      return res.status(200).json({
        status: result,
        data: [{ createotp, formatted }],
        message: "OTP sent successfully",
        error: [],
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Failed to send OTP",
      error: error.message || error,
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { email, userName, password, otp } = req.body;

    const [userDataResult] = await db.query(
      "SELECT * FROM signup WHERE email = ?",
      [email]
    );
    const userData = userDataResult[0];

    if (!userData) {
      return res
        .status(404)
        .json({ message: "OTP not generated for this email" });
    }

    const now = new Date();
    const expire = new Date(userData.expires_at);

    if (now.getTime().toString() > expire.getTime().toString()) {
      return res.status(403).json({
        message: "OTP expired",
        data: [],
        status: 0,
        error: [],
      });
    }

    if (userData.code.toString() !== otp.toString()) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    const hashGenerate = await hashGenerator(password);
    const [createUser] = await db.query(
      "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
      [userName, email, hashGenerate]
    );
    const userId = createUser.insertId;

    const token = await tokenGenerate(userId, email);
    const result = createUser.affectedRows ? 1 : 0;

    await db.query("DELETE FROM signup WHERE email = ?", [email]);

    return res.status(201).json({
      status: result,
      message: "User created successfully",
      data: [{ token }],
      error: [],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Registration failed",
      error: error.message || error,
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email, password, confirmpassword, otp } = req.body;
    const [userDataResult] = await db.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );
    const userData = userDataResult[0];

    if (!userData) {
      return res.status(404).json({ message: "This email is not Registered" });
    }

    const now = new Date();
    const expire = new Date(userData.otp_expirity);

    if (now.getTime().toString() > expire.getTime().toString()) {
      return res.status(403).json({
        message: "OTP expired",
        data: [],
        status: 0,
        error: [],
      });
    }
    if (userData.otp.toString() !== otp.toString()) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }
    let token = await tokenGenerate(userData?.id,email);
    let hash = await hashGenerator(password);
    const changePwd = await db.query("UPDATE user SET password = ? ", hash);
    let result = changePwd.affectedRows ? 1 : 0;
    return res.status(200).json({
      status: result,
      message: "Password Changed",
      error: [],
      data: [{ token }],
    });
  } catch (error) {
    return res.status(200).json({
      status: 0,
      message: "Password not Changed",
      error: [{ error }],
      data: [],
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email illa",
        status: 0,
        error: [],
        data: [],
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "password illa",
        status: 0,
        error: [],
        data: [],
      });
    }
    if (!newPassword) {
      return res.status(400).json({
        message: "newPassword illa",
        status: 0,
        error: [],
        data: [],
      });
    }
    let [userResult] = await db.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    const userData = userResult[0];
    const comparePassword = await hashCompare(password, userData.password);
    let hash = await hashGenerator(newPassword);
    if (comparePassword) {
      const changepassword = await db.query(
        "UPDATE user SET password = ? ",
        hash
      );
      let token = await tokenGenerate( userData.id,email);
      let result = changepassword.affectedRows ? 1 : 0;
      return res.status(200).json({
        state: result,
        data: [],
        message: "The Password is Updated",
        error: [],
      });
    }
    return res
      .status(400)
      .json({ message: "Incorrect Password", status: 0, data: [], error: [] });
  } catch (error) {
    return res.status(400).json({
      message: "The password is not updated",
      status: 0,
      data: [],
      errro: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = rows[0];
    const passwordCheck = await hashCompare(password, user.password);
    console.log("passwordCheck", passwordCheck);
    if (!passwordCheck) {
      return res.status(403).json({ message: "Invalid Password" });
    }

    const token = await tokenGenerate( user.id,email);

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const check = async (req, res) => {
  return res.status(200).json("hello");
};


export const languageAndGener = async (req, res) => {
  try {
    const { email, language, gener, dateOfBirth } = req.body;

    if (!email) {
      return res.status(400).json({
        data: [],
        status: 0,
        message: "Email illa",  
      });
    }

    const fields = [];
    const values = [];

    if (language) {
      const langArray =
        typeof language === "string" ? language.split(",") : language;
      fields.push("language_id = ?");
      values.push(langArray.join(","));
    }

    if (gener) {
      const generArray = typeof gener === "string" ? gener.split(",") : gener;
      fields.push("gener_id = ?");
      values.push(generArray.join(","));
    }
    if (dateOfBirth) {
      fields.push("date_of_birth = ?");
      values.push(dateOfBirth);
    }

    if (fields.length === 0) {
      return res.status(400).json({
        data: [],
        status: 0,
        message: "Fields la data varala",  
      });
    }

    values.push(email);

    const sqlQuery = `UPDATE user SET ${fields.join(", ")} WHERE email = ?`;

    const [result] = await db.query(sqlQuery, values);

    return res.status(200).json({
      status: result.affectedRows ? 1 : 0,
      message: "User profile updated successfully",
      data: {
        updatedFields: fields.map((f) => f.split(" ")[0]),
      },
      error: [],
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      status: 0,
      message: "Server error",
    });
  }
};





export const editProfile = async (req, res) => {
  try {
    const { id, name, bio, gender, notification, dateOfBirth } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "id illa bro"
      });
    }

    let fields = [];
    let values = [];

    if (name) {
      fields.push("name = ?");
      values.push(name);
    }
    if (bio) {
      fields.push("bio = ?");
      values.push(bio);
    }
    if (gender) {
      fields.push("gender = ?");
      values.push(gender);
    }
    if (dateOfBirth) {
      fields.push("date_of_birth = ?");
      values.push(dateOfBirth);
    }
    if (notification !== undefined) {   
      fields.push("is_notify = ?");
      values.push(notification);
    }

    if (fields.length === 0) {
      return res.status(400).json({
        message: "No fields to update",
        status: 0,
      });
    }

    values.push(id);  
    const sql = `UPDATE user SET ${fields.join(", ")} WHERE id = ?`;

    const [result] = await db.query(sql, values);

    return res.status(200).json({
      status: result.affectedRows ? 1 : 0,
      message: "User profile updated successfully",
      data: {
        updatedFields: fields.map((f) => f.split(" =")[0]),
      },
      error: [],
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
      status: 0,
      message: "Server error",
    });
  }
}


export const reportList = async(req,res)=>{
  try {
    const [getList] = await db.query("SELECT title  FROM report_list WHERE status = 0 ")
    let result = getList.length ? 1 : 0;
    return res.status(200).json({
      message:"The report List",
      data:[getList],
      error:[],
      status:result
    })
  } catch (error) {
    return res.status(400).json({error:error.message})
  }
}

