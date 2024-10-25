"use strict";
const submit = document.querySelector("#calculate");
const clear = document.querySelector("#clear");
// string[] == Array<string>
let errors = [];
const validateNumber = (value, fieldName) => {
    const numberValue = Number(value);
    if (Number.isNaN(numberValue) || numberValue < 0) {
        errors.push(`กรุณากรอก ${fieldName} เป็นตัวเลขที่ไม่ติดลบ เช่น 1`);
        return 0; // ค่าเริ่มต้นถ้าผิด
    }
    return numberValue;
};
const calculate = (unit, area_rai, area_ngan, area_square_wa, area_square_meter) => {
    switch (unit) {
        case "ไร่":
            return area_rai + (area_ngan / 4) + (area_square_wa / 400) + (area_square_meter / 1600);
        case "งาน":
            return (area_rai * 4) + area_ngan + (area_square_wa / 100) + (area_square_meter / 400);
        case "ตารางวา":
            return (area_rai * 400) + (area_ngan * 100) + area_square_wa + (area_square_meter / 4);
        case "ตารางเมตร":
            return (area_rai * 1600) + (area_ngan * 400) + (area_square_wa * 4) + area_square_meter;
        default: return 0;
    }
};
if (submit != null) {
    try {
        submit.addEventListener("click", (e) => {
            e.preventDefault();
            errors = [];
            //ขนาดพื้นที่ทั้งหมด
            const area_rai = validateNumber(document.querySelector("#area_rai").value, "พื้นที่ไร่");
            const area_ngan = validateNumber(document.querySelector("#area_ngan").value, "พื้นที่งาน");
            const area_square_wa = validateNumber(document.querySelector("#area_square_wa").value, "พื้นที่ตารางวา");
            const area_square_meter = validateNumber(document.querySelector("#area_square_meter").value, "พื้นที่ตารางเมตร");
            //หน่วยวัดพื้นที่ (สำหรับคำนวนปริมาณปุ๋ย)
            const area_unit = document.querySelector("#area_unit").value;
            //ปริมาณปุ๋ยต่อหน่วย 1 หน่วยวัดพื้นที่
            const FertilizerPerUnit = validateNumber(document.querySelector("#FertilizerPerUnit").value, "ปริมาณปุ๋ยต่อหน่วย");
            //หน่วยวัดปริมาณ
            const FertilizerUnit = document.querySelector("#FertilizerUnit").value;
            let area = calculate(area_unit, area_rai, area_ngan, area_square_wa, area_square_meter);
            if (errors.length > 0) {
                alert(errors.join("\n"));
                errors = [];
            }
            else {
                const fertilizerAmount = area * FertilizerPerUnit * Number(FertilizerUnit);
                const resultElement = document.querySelector("#result");
                resultElement.style.display = "block";
                resultElement.innerHTML = `<h2>ปริมาณปุ๋ยที่ใช้ทั้งหมด: ${fertilizerAmount} ${FertilizerUnit == "1" ? "กิโลกรัม" : "กรัม"}</h2>`;
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}
if (clear != null) {
    clear.addEventListener("click", () => {
        try {
            const resultElement = document.querySelector("#result");
            resultElement.style.display = "none";
        }
        catch (error) {
            console.log(error);
        }
    });
}
