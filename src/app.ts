const submit = document.querySelector("#calculate") as HTMLElement;
const clear = document.querySelector("#clear") as HTMLElement;

// string[] == Array<string>
let errors: string[] = []

const validateNumber = (value: string, fieldName: string): number => {
    const numberValue = Number(value);
    if (Number.isNaN(numberValue) || numberValue < 0) {
        errors.push(`กรุณากรอก ${fieldName} เป็นตัวเลขที่ไม่ติดลบ เช่น 1`);
        return 0; // ค่าเริ่มต้นถ้าผิด
    }
    return numberValue;
}

const calculate = (unit: string, area_rai: number, area_ngan: number, area_square_wa: number, area_square_meter: number): number => {
    switch (unit) {
        case "ไร่":
            return area_rai + (area_ngan / 4) + (area_square_wa / 400) + (area_square_meter / 1600)
        case "งาน":
            return (area_rai * 4) + area_ngan + (area_square_wa / 100) + (area_square_meter / 400);
        case "ตารางวา":
            return (area_rai * 400) + (area_ngan * 100) + area_square_wa + (area_square_meter / 4);
        case "ตารางเมตร":
            return (area_rai * 1600) + (area_ngan * 400) + (area_square_wa * 4) + area_square_meter;
        default: return 0;
    }
}

if (submit != null) {
    try {
        submit.addEventListener("click", (e: Event) => {
            e.preventDefault();
            errors = [];
            //ขนาดพื้นที่ทั้งหมด

            const area_rai = validateNumber((document.querySelector("#area_rai") as HTMLInputElement).value, "พื้นที่ไร่");
            const area_ngan = validateNumber((document.querySelector("#area_ngan") as HTMLInputElement).value, "พื้นที่งาน");
            const area_square_wa = validateNumber((document.querySelector("#area_square_wa") as HTMLInputElement).value, "พื้นที่ตารางวา");
            const area_square_meter = validateNumber((document.querySelector("#area_square_meter") as HTMLInputElement).value, "พื้นที่ตารางเมตร");

            //หน่วยวัดพื้นที่ (สำหรับคำนวนปริมาณปุ๋ย)
            const area_unit = (
                document.querySelector("#area_unit") as HTMLSelectElement
            ).value;

            //ปริมาณปุ๋ยต่อหน่วย 1 หน่วยวัดพื้นที่
            const FertilizerPerUnit = validateNumber((document.querySelector("#FertilizerPerUnit") as HTMLInputElement).value, "ปริมาณปุ๋ยต่อหน่วย");

            //หน่วยวัดปริมาณ
            const FertilizerUnit = (document.querySelector("#FertilizerUnit") as HTMLSelectElement).value;

            let area = calculate(area_unit, area_rai, area_ngan, area_square_wa, area_square_meter);

            if (errors.length > 0) {
                alert(errors.join("\n"));
                errors = [];
            } else {
                const fertilizerAmount = area * FertilizerPerUnit * Number(FertilizerUnit);
                const resultElement = document.querySelector("#result") as HTMLDivElement;
                resultElement.style.display = "block";
                resultElement.innerHTML = `<h2>ปริมาณปุ๋ยที่ใช้ทั้งหมด: ${fertilizerAmount} ${FertilizerUnit == "1" ? "กิโลกรัม" : "กรัม"}</h2>`;
            }
        });
    } catch (error) {
        console.log(error);
    }
}

if (clear != null) {
    clear.addEventListener("click",()=>{
        try {
            const resultElement = document.querySelector("#result") as HTMLDivElement;
            resultElement.style.display = "none";
        } catch (error) {
            console.log(error);
        }
    })
}
