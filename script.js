/* ============================================================
   المتغيرات العامة
============================================================ */

const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");
const loginOverlay = document.getElementById("loginOverlay");
const app = document.getElementById("app");

const clientNameInput = document.getElementById("clientName");
const clientPhoneInput = document.getElementById("clientPhone");
const cakeNameInput = document.getElementById("cakeName");
const cakeServingsInput = document.getElementById("cakeServings");

const cakeShapeInput = document.getElementById("cakeShape");
const cakeSizeInput = document.getElementById("cakeSize");
const rectSizeInput = document.getElementById("rectSize");
const customHeightInput = document.getElementById("customHeight");
const customHeightBox = document.getElementById("customHeightBox");

const pickupDateInput = document.getElementById("pickupDate");
const pickupTimeInput = document.getElementById("pickupTime");

const printImageInput = document.getElementById("printImage");
const previewImage = document.getElementById("previewImage");
const previewImageBox = document.getElementById("previewImageBox");

const fillingsTableBody = document.querySelector("#fillingsTable tbody");
const addonsTableBody = document.querySelector("#addonsTable tbody");

const overheadPercentInput = document.getElementById("overheadPercent");
const profitPercentInput = document.getElementById("profitPercent");
const rushPercentInput = document.getElementById("rushPercent");

const calculateBtn = document.getElementById("calculateBtn");
const resultsSection = document.getElementById("resultsSection");

const fillingsTotalEl = document.getElementById("fillingsTotal");
const addonsTotalEl = document.getElementById("addonsTotal");
const overheadValueEl = document.getElementById("overheadValue");
const profitValueEl = document.getElementById("profitValue");
const rushValueEl = document.getElementById("rushValue");
const beforeVatEl = document.getElementById("beforeVat");
const vatValueEl = document.getElementById("vatValue");
const afterVatEl = document.getElementById("afterVat");

const exportExcelBtn = document.getElementById("exportExcelBtn");
const whatsAppBtn = document.getElementById("whatsAppBtn");
const whatsAppProductionBtn = document.getElementById("whatsAppProductionBtn");
const sendEmailBtn = document.getElementById("sendEmailBtn");
const printInvoiceBtn = document.getElementById("printInvoiceBtn");

const ordersTableBody = document.querySelector("#ordersTable tbody");

let uploadedImageBase64 = "";
let lastCalculation = null;
let branchName = "";

/* ============================================================
   تسجيل الدخول وتحديد الفرع
============================================================ */

function handleLogin() {
    const pass = passwordInput.value.trim();

    if (pass === "0000") branchName = "العزيزية";
    else if (pass === "1111") branchName = "المباركية";
    else if (pass === "2222") branchName = "القطيف";
    else if (pass === "3333") branchName = "الفيصلية";
    else {
        loginError.textContent = "كلمة المرور غير صحيحة";
        return;
    }

    loginOverlay.style.display = "none";
    app.style.display = "block";
}

loginBtn.addEventListener("click", handleLogin);

/* ============================================================
   رفع الصورة وتحويلها Base64
============================================================ */

printImageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        uploadedImageBase64 = e.target.result;
        previewImage.src = uploadedImageBase64;
        previewImageBox.style.display = "block";
    };
    reader.readAsDataURL(file);
});

/* ============================================================
   إظهار/إخفاء المقاسات حسب الشكل
============================================================ */

cakeShapeInput.addEventListener("change", () => {
    if (cakeShapeInput.value === "round") {
        document.getElementById("roundSizes").style.display = "block";
        document.getElementById("rectSizes").style.display = "none";
    } else {
        document.getElementById("roundSizes").style.display = "none";
        document.getElementById("rectSizes").style.display = "block";
    }
});

/* إظهار ارتفاع الكيك عند اختيار مخصص */
cakeSizeInput.addEventListener("change", () => {
    customHeightBox.style.display = cakeSizeInput.value === "custom" ? "block" : "none";
});
/* ============================================================
   إنشاء صف حشوة
============================================================ */

function createFillingRow(name = "", qty = 1, price = 0) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td><input type="text" value="${name}"></td>
        <td><input type="number" value="${qty}" min="1"></td>
        <td><input type="number" value="${price}" step="0.5"></td>
        <td class="total">0</td>
        <td><button class="btn btn-danger btn-sm">حذف</button></td>
    `;

    const qtyInput = tr.children[1].children[0];
    const priceInput = tr.children[2].children[0];
    const totalCell = tr.querySelector(".total");
    const deleteBtn = tr.querySelector("button");

    function update() {
        const total = (parseFloat(qtyInput.value) || 0) * (parseFloat(priceInput.value) || 0);
        totalCell.textContent = total.toFixed(2);
    }

    qtyInput.addEventListener("input", update);
    priceInput.addEventListener("input", update);
    deleteBtn.addEventListener("click", () => tr.remove());

    update();
    fillingsTableBody.appendChild(tr);
}

/* حشوات افتراضية */
createFillingRow("شوكولاتة", 1, 10);
createFillingRow("فانيلا", 1, 8);
createFillingRow("لوتس", 1, 12);
createFillingRow("كراميل", 1, 10);
createFillingRow("نوتيلا", 1, 15);
createFillingRow("كريمة مخفوقة", 1, 7);
createFillingRow("كريمة جبن", 1, 12);
createFillingRow("مانجو", 1, 10);
createFillingRow("بستاشيو", 1, 18);

addFillingBtn.addEventListener("click", () => createFillingRow());

/* ============================================================
   إنشاء صف إضافة
============================================================ */

function createAddonRow(name = "", qty = 1, price = 0) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td><input type="text" value="${name}"></td>
        <td><input type="number" value="${qty}" min="1"></td>
        <td><input type="number" value="${price}" step="0.5"></td>
        <td class="total">0</td>
        <td><button class="btn btn-danger btn-sm">حذف</button></td>
    `;

    const qtyInput = tr.children[1].children[0];
    const priceInput = tr.children[2].children[0];
    const totalCell = tr.querySelector(".total");
    const deleteBtn = tr.querySelector("button");

    function update() {
        const total = (parseFloat(qtyInput.value) || 0) * (parseFloat(priceInput.value) || 0);
        totalCell.textContent = total.toFixed(2);
    }

    qtyInput.addEventListener("input", update);
    priceInput.addEventListener("input", update);
    deleteBtn.addEventListener("click", () => tr.remove());

    update();
    addonsTableBody.appendChild(tr);
}

/* إضافات افتراضية */
createAddonRow("صورة", 1, 10);
createAddonRow("وردة طبيعي", 1, 60);
createAddonRow("وردة صناعي صغيرة", 1, 5);

addAddonBtn.addEventListener("click", () => createAddonRow());

/* ============================================================
   تحويل الوقت إلى 12 ساعة
============================================================ */

function formatTime12(timeStr) {
    if (!timeStr) return "";

    let [h, m] = timeStr.split(":");
    h = parseInt(h);

    let suffix = h >= 12 ? "مساءً" : "صباحًا";
    h = h % 12 || 12;

    return `${h}:${m} ${suffix}`;
}
/* ============================================================
   حساب السعر
============================================================ */

function calculateTotals() {
    let fillingsTotal = 0;
    let addonsTotal = 0;

    /* إجمالي الحشوات */
    document.querySelectorAll("#fillingsTable tbody tr").forEach(tr => {
        const qty = parseFloat(tr.children[1].children[0].value) || 0;
        const price = parseFloat(tr.children[2].children[0].value) || 0;
        fillingsTotal += qty * price;
    });

    /* إجمالي الإضافات */
    document.querySelectorAll("#addonsTable tbody tr").forEach(tr => {
        const qty = parseFloat(tr.children[1].children[0].value) || 0;
        const price = parseFloat(tr.children[2].children[0].value) || 0;
        addonsTotal += qty * price;
    });

    return { fillingsTotal, addonsTotal };
}

/* ============================================================
   إنشاء باتش الطلب (التاريخ + الوقت)
============================================================ */

function generateBatchNumber() {
    const now = new Date();

    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");

    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");

    return `${y}${m}${d}-${hh}${mm}${ss}`;
}

/* ============================================================
   عداد الطلبات لكل فرع + إعادة تعيين يومي
============================================================ */

function resetDailyCounter(branch) {
    const today = new Date().toISOString().split("T")[0];
    const keyDate = "orderCounterDate_" + branch;
    const keyCounter = "orderCounter_" + branch;

    const savedDate = localStorage.getItem(keyDate);

    if (savedDate !== today) {
        localStorage.setItem(keyDate, today);
        localStorage.setItem(keyCounter, 0);
    }
}

function getNextOrderNumber(branch) {
    const key = "orderCounter_" + branch;

    let num = localStorage.getItem(key);
    if (!num) num = 1;
    else num = parseInt(num) + 1;

    localStorage.setItem(key, num);
    return num;
}

/* ============================================================
   زر احسب السعر
============================================================ */

calculateBtn.addEventListener("click", () => {

    /* إعادة تعيين عداد الفرع لليوم */
    resetDailyCounter(branchName);

    /* رقم الطلب */
    const orderNumber = getNextOrderNumber(branchName);

    /* باتش الطلب */
    const batchNumber = generateBatchNumber();

    /* حساب الإجماليات */
    const { fillingsTotal, addonsTotal } = calculateTotals();

    /* حساب سعر الكيك الأساسي */
    let cakeBasePrice = 0;

    if (cakeShapeInput.value === "round") {
        if (cakeSizeInput.value === "15") cakeBasePrice = 60;
        else if (cakeSizeInput.value === "20") cakeBasePrice = 80;
        else if (cakeSizeInput.value === "25") cakeBasePrice = 110;
        else if (cakeSizeInput.value === "custom") {
            const h = parseFloat(customHeightInput.value) || 10;
            cakeBasePrice = h * 6;
        }
    } else {
        if (rectSizeInput.value === "30x40") cakeBasePrice = 230;
        else if (rectSizeInput.value === "60x40") cakeBasePrice = 345;
    }

    /* التشغيل والربح */
    const overhead = (cakeBasePrice + fillingsTotal + addonsTotal) * (parseFloat(overheadPercentInput.value) / 100);
    const profit = (cakeBasePrice + fillingsTotal + addonsTotal + overhead) * (parseFloat(profitPercentInput.value) / 100);
    const rush = (cakeBasePrice + fillingsTotal + addonsTotal + overhead + profit) * (parseFloat(rushPercentInput.value) / 100);

    const beforeVat = cakeBasePrice + fillingsTotal + addonsTotal + overhead + profit + rush;
    const vat = beforeVat * 0.15;
    const afterVat = beforeVat + vat;

    /* عرض النتائج */
    fillingsTotalEl.textContent = fillingsTotal.toFixed(2);
    addonsTotalEl.textContent = addonsTotal.toFixed(2);
    overheadValueEl.textContent = overhead.toFixed(2);
    profitValueEl.textContent = profit.toFixed(2);
    rushValueEl.textContent = rush.toFixed(2);
    beforeVatEl.textContent = beforeVat.toFixed(2);
    vatValueEl.textContent = vat.toFixed(2);
    afterVatEl.textContent = afterVat.toFixed(2);

    resultsSection.style.display = "block";

    /* حفظ آخر عملية */
    lastCalculation = {
        branch: branchName,
        orderNumber,
        batchNumber,
        date: new Date().toLocaleString("ar-SA"),
        clientName: clientNameInput.value,
        clientPhone: clientPhoneInput.value,
        cakeName: cakeNameInput.value,
        cakeShape: cakeShapeInput.value,
        cakeSize: cakeSizeInput.value,
        rectSize: rectSizeInput.value,
        servings: cakeServingsInput.value,
        pickupDate: pickupDateInput.value,
        pickupTime: pickupTimeInput.value,
        fillingsTotal,
        addonsTotal,
        overheadValue: overhead,
        profitValue: profit,
        rushValue: rush,
        beforeVat,
        vatValue: vat,
        afterVat,
        image: uploadedImageBase64
    };

    saveOrder(lastCalculation);
    loadOrders();
});
/* ============================================================
   حفظ الطلب في LocalStorage
============================================================ */

function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
}

/* ============================================================
   تحميل الطلبات في الجدول
============================================================ */

function loadOrders() {
    ordersTableBody.innerHTML = "";

    let orders = JSON.parse(localStorage.getItem("orders") || "[]");

    orders.forEach((o, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${o.date}</td>
            <td>${o.orderNumber}</td>
            <td>${o.batchNumber}</td>
            <td>${o.clientName}</td>
            <td>${o.clientPhone}</td>
            <td>${o.cakeName}</td>
            <td>${o.afterVat.toFixed(2)} ﷼</td>
            <td><button class="btn btn-primary btn-sm" onclick="viewOrder(${index})">عرض</button></td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteOrder(${index})">حذف</button></td>
        `;

        ordersTableBody.appendChild(tr);
    });
}

loadOrders();

/* ============================================================
   عرض تفاصيل الطلب
============================================================ */

function viewOrder(index) {
    let orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const o = orders[index];

    alert(
        `تفاصيل الطلب:\n\n` +
        `الفرع: ${o.branch}\n` +
        `رقم الطلب: ${o.orderNumber}\n` +
        `باتش الطلب: ${o.batchNumber}\n` +
        `العميل: ${o.clientName}\n` +
        `الهاتف: ${o.clientPhone}\n` +
        `الطلب: ${o.cakeName}\n` +
        `السعر النهائي: ${o.afterVat.toFixed(2)} ﷼`
    );
}

/* ============================================================
   حذف الطلب
============================================================ */

function deleteOrder(index) {
    if (!confirm("هل تريد حذف هذا الطلب؟")) return;

    let orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));

    loadOrders();
}
/* ============================================================
   تحويل الصورة Base64 إلى PDF Base64
============================================================ */

function convertImageToPDFBase64(imageBase64) {
    return new Promise((resolve) => {
        const pdf = new jspdf.jsPDF();
        const img = new Image();

        img.onload = function () {
            pdf.addImage(img, "JPEG", 10, 10, 180, 180);
            const pdfBase64 = pdf.output("datauristring").split(",")[1];
            resolve(pdfBase64);
        };

        img.src = imageBase64;
    });
}

/* ============================================================
   إرسال الإيميل عبر EmailJS
============================================================ */

sendEmailBtn.addEventListener("click", async () => {
    if (!lastCalculation) return alert("احسب السعر أولاً");

    const o = lastCalculation;

    let pdfAttachment = "";
    if (o.image) {
        pdfAttachment = await convertImageToPDFBase64(o.image);
    }

    const templateParams = {
        to_email: "alyahyabakery2023@gmail.com",
        branch: o.branch,
        order_number: o.orderNumber,
        batch_number: o.batchNumber,
        date: o.date,
        client_name: o.clientName,
        client_phone: o.clientPhone,
        cake_name: o.cakeName,
        cake_shape: o.cakeShape === "round" ? "دائري" : "مستطيل",
        cake_size: o.cakeShape === "round" ? o.cakeSize : o.rectSize,
        servings: o.servings,
        pickup_date: o.pickupDate,
        pickup_time: o.pickupTime,
        fillings_total: o.fillingsTotal.toFixed(2),
        addons_total: o.addonsTotal.toFixed(2),
        overhead: o.overheadValue.toFixed(2),
        profit: o.profitValue.toFixed(2),
        rush: o.rushValue.toFixed(2),
        before_vat: o.beforeVat.toFixed(2),
        vat: o.vatValue.toFixed(2),
        after_vat: o.afterVat.toFixed(2),
        attachment: pdfAttachment
    };

    emailjs.send("service_8wcyu74", "template_pj1fzph", templateParams)
        .then(() => alert("تم إرسال الإيميل بنجاح"))
        .catch(() => alert("حدث خطأ أثناء إرسال الإيميل"));
});

/* ============================================================
   واتساب العميل
============================================================ */

whatsAppBtn.addEventListener("click", () => {
    if (!lastCalculation) return alert("احسب السعر أولاً");

    const o = lastCalculation;

    let msg = `طلب جديد من اليحي\n\n`;
    msg += `رقم الطلب: ${o.orderNumber}\n`;
    msg += `باتش الطلب: ${o.batchNumber}\n`;
    msg += `الفرع: ${o.branch}\n\n`;
    msg += `العميل: ${o.clientName}\n`;
    msg += `الهاتف: ${o.clientPhone}\n\n`;
    msg += `الطلب: ${o.cakeName}\n`;
    msg += `الشكل: ${o.cakeShape === "round" ? "دائري" : "مستطيل"}\n`;
    msg += `المقاس: ${o.cakeShape === "round" ? o.cakeSize : o.rectSize}\n`;
    msg += `عدد الحصص: ${o.servings}\n\n`;
    msg += `السعر النهائي: ${o.afterVat.toFixed(2)} ﷼`;

    const url = `https://wa.me/${o.clientPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
});

/* ============================================================
   واتساب الإنتاج
============================================================ */

whatsAppProductionBtn.addEventListener("click", () => {
    if (!lastCalculation) return alert("احسب السعر أولاً");

    const o = lastCalculation;

    let msg = `طلب جديد للإنتاج\n\n`;
    msg += `رقم الطلب: ${o.orderNumber}\n`;
    msg += `باتش الطلب: ${o.batchNumber}\n`;
    msg += `الفرع: ${o.branch}\n\n`;
    msg += `العميل: ${o.clientName}\n`;
    msg += `الهاتف: ${o.clientPhone}\n\n`;
    msg += `الطلب: ${o.cakeName}\n`;
    msg += `الشكل: ${o.cakeShape === "round" ? "دائري" : "مستطيل"}\n`;
    msg += `المقاس: ${o.cakeShape === "round" ? o.cakeSize : o.rectSize}\n`;
    msg += `عدد الحصص: ${o.servings}\n\n`;
    msg += `موعد الاستلام: ${o.pickupDate} - ${formatTime12(o.pickupTime)}\n\n`;
    msg += `السعر النهائي: ${o.afterVat.toFixed(2)} ﷼`;

    const url = `https://wa.me/966500000000?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
});

/* ============================================================
   طباعة الطلب
============================================================ */

printInvoiceBtn.addEventListener("click", () => {
    if (!lastCalculation) return alert("احسب السعر أولاً");

    const o = lastCalculation;

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
        <html>
        <head>
            <title>طلب رقم ${o.orderNumber}</title>
            <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap" rel="stylesheet">
            <style>
                body { font-family: 'Tajawal', sans-serif; direction: rtl; padding: 25px; }
                .title { font-size: 26px; font-weight: 700; color: #b88a44; text-align:center; margin-bottom:20px; }
                .label { font-weight:700; color:#9a7032; display:inline-block; width:150px; }
                img { max-width:250px; margin-top:10px; border-radius:10px; border:1px solid #ccc; }
                .section { margin-bottom:15px; border-bottom:1px solid #ddd; padding-bottom:10px; }
            </style>
        </head>
        <body>

            <div class="title">طلب رقم ${o.orderNumber}</div>

            <div class="section">
                <span class="label">الفرع:</span> ${o.branch}<br>
                <span class="label">باتش الطلب:</span> ${o.batchNumber}<br>
                <span class="label">التاريخ:</span> ${o.date}
            </div>

            <div class="section">
                <span class="label">اسم العميل:</span> ${o.clientName}<br>
                <span class="label">الهاتف:</span> ${o.clientPhone}
            </div>

            <div class="section">
                <span class="label">الطلب:</span> ${o.cakeName}<br>
                <span class="label">الشكل:</span> ${o.cakeShape}<br>
                <span class="label">المقاس:</span> ${o.cakeSize}<br>
                <span class="label">عدد الحصص:</span> ${o.servings}<br>
                <span class="label">موعد الاستلام:</span> ${o.pickupDate} - ${formatTime12(o.pickupTime)}
            </div>

            <div class="section">
                <span class="label">السعر النهائي:</span> ${o.afterVat.toFixed(2)} ﷼
            </div>

            ${o.image ? `<img src="${o.image}">` : ""}
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.print();
});
