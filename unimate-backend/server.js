const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./config/db");

db.query("SELECT 1 AS test", (err, result) => {
    if(err){
        console.log(err);
    }else{
        console.log(result);
    }
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("CHI_TEST_123456");
});

app.get("/api/truong", (req, res) => {
    const sql = `
        SELECT
            id_truong,
            ma_truong,
            ten_truong,
            dia_chi,
            loai_hinh,
            khoi_nganh,
            thu_hang,
            trong_diem
        FROM truong_dh
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Lỗi truy vấn dữ liệu"
            });
        }

        res.json(result);
    });
});

app.get("/api/truong/timkiem", (req, res) => {
    const keyword = req.query.q;

    const sql = `
        SELECT *
        FROM truong_dh
        WHERE ten_truong LIKE ?
    `;

    db.query(sql, [`%${keyword}%`], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Lỗi truy vấn dữ liệu"
            });
        }

        res.json(result);
    });
});

app.get("/api/truong/:id", (req, res) => {
    const id = req.params.id;

    const sql = `
        SELECT *
        FROM truong_dh
        WHERE id_truong = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Lỗi truy vấn dữ liệu"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy trường"
            });
        }

        res.json(result[0]);
    });
});

app.get("/abc123", (req, res) => {
    res.send("TOI_DA_VAO_DAY");
});
console.log("FILE SERVER DANG CHAY");
app.listen(5000, () => {
    console.log("Server running on port 5000");
});