/* ============================================================
   شاشة تسجيل الدخول
============================================================ */

const loginOverlay = document.getElementById("loginOverlay");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");
const app = document.getElementById("app");

const PASSWORD = "0000";

function handleLogin() {
    if (passwordInput.value.trim() === PASSWORD) {
        loginOverlay.style.display = "none";
        app.style.display = "block";
    } else {
        loginError.textContent = "كلمة المرور غير صحيحة";
    }
}

loginBtn.addEventListener("click", handleLogin);
passwordInput.addEventListener("keyup", e => {
    if (e.key === "Enter") handleLogin();
});

/* ============================================================
   عناصر النموذج
============================================================ */

const clientNameInput = document.getElementById("clientName");
const clientPhoneInput = document.getElementById("clientPhone");

const cakeNameInput = document.getElementById("cakeName");
const cakeShapeInput = document.getElementById("cakeShape");
const cakeSizeInput = document.getElementById("cakeSize");
const rectSizeInput = document.getElementById("rectSize");
const cakeServingsInput = document.getElementById("cakeServings");

const pickupDateInput = document.getElementById("pickupDate");
const pickupTimeInput = document.getElementById("pickupTime");

const roundSizesBox = document.getElementById("roundSizes");
const rectSizesBox = document.getElementById("rectSizes");
const customHeightBox = document.getElementById("customHeightBox");
const customHeightInput = document.getElementById("customHeight");

const overheadPercentInput = document.getElementById("overheadPercent");
const profitPercentInput = document.getElementById("profitPercent");
const rushPercentInput = document.getElementById("rushPercent");

const calculateBtn = document.getElementById("calculateBtn");
const exportExcelBtn = document.getElementById("exportExcelBtn");
const whatsAppBtn = document.getElementById("whatsAppBtn");
const whatsAppProductionBtn = document.getElementById("whatsAppProductionBtn");

const resultsSection = document.getElementById("resultsSection");
const fillingsTotalEl = document.getElementById("fillingsTotal");
const addonsTotalEl = document.getElementById("addonsTotal");
const overheadValueEl = document.getElementById("overheadValue");
const profitValueEl = document.getElementById("profitValue");
const rushValueEl = document.getElementById("rushValue");
const beforeVatEl = document.getElementById("beforeVat");
const vatValueEl = document.getElementById("vatValue");
const afterVatEl = document.getElementById("afterVat");

const fillingsTableBody = document.querySelector("#fillingsTable tbody");
const addonsTableBody = document.querySelector("#addonsTable tbody");
const addFillingBtn = document.getElementById("addFillingBtn");
const addAddonBtn = document.getElementById("addAddonBtn");

const ordersTableBody = document.querySelector("#ordersTable tbody");

let lastCalculation = null;

/* ============================================================
   تبديل شكل الكيك (دائري / مستطيل)
============================================================ */

cakeShapeInput.addEventListener("change", () => {
    if (cakeShapeInput.value === "round") {
        roundSizesBox.style.display = "block";
        rectSizesBox.style.display = "none";
    } else {
        roundSizesBox.style.display = "none";
        rectSizesBox.style.display = "block";
    }
});

/* ============================================================
   إظهار خانة الارتفاع عند اختيار "مخصص"
============================================================ */

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

calculateBtn.addEventListener("click", () => {
    let fillingsTotal = 0;
    let addonsTotal = 0;

    /* حساب الحشوات */
    fillingsTableBody.querySelectorAll("tr").forEach(row => {
        fillingsTotal += parseFloat(row.querySelector(".total").textContent) || 0;
    });

    /* حساب الإضافات */
    addonsTableBody.querySelectorAll("tr").forEach(row => {
        addonsTotal += parseFloat(row.querySelector(".total").textContent) || 0;
    });

    /* حساب سعر المقاس */
    let basePrice = 0;

    if (cakeShapeInput.value === "round") {
        if (cakeSizeInput.value === "15") basePrice = 60;
        if (cakeSizeInput.value === "20") basePrice = 80;
        if (cakeSizeInput.value === "25") basePrice = 110;
        if (cakeSizeInput.value === "custom") {
            const h = parseFloat(customHeightInput.value) || 10;
            basePrice = h * 6;
        }
    } else {
        if (rectSizeInput.value === "30x40") basePrice = 230;
        if (rectSizeInput.value === "60x40") basePrice = 345;
    }

    /* التشغيل */
    const overheadValue = fillingsTotal * (parseFloat(overheadPercentInput.value) / 100);

    /* الربح */
    const profitValue = (fillingsTotal + addonsTotal + overheadValue + basePrice) *
        (parseFloat(profitPercentInput.value) / 100);

    /* مستعجل */
    const rushValue = (fillingsTotal + addonsTotal + overheadValue + basePrice) *
        (parseFloat(rushPercentInput.value) / 100);

    /* المجموع */
    const beforeVat = fillingsTotal + addonsTotal + overheadValue + profitValue + rushValue + basePrice;
    const vatValue = beforeVat * 0.15;
    const afterVat = beforeVat + vatValue;

    /* عرض النتائج */
    fillingsTotalEl.textContent = fillingsTotal.toFixed(2) + " ﷼";
    addonsTotalEl.textContent = addonsTotal.toFixed(2) + " ﷼";
    overheadValueEl.textContent = overheadValue.toFixed(2) + " ﷼";
    profitValueEl.textContent = profitValue.toFixed(2) + " ﷼";
    rushValueEl.textContent = rushValue.toFixed(2) + " ﷼";
    beforeVatEl.textContent = beforeVat.toFixed(2) + " ﷼";
    vatValueEl.textContent = vatValue.toFixed(2) + " ﷼";
    afterVatEl.textContent = afterVat.toFixed(2) + " ﷼";

    resultsSection.style.display = "block";

    /* حفظ آخر عملية */
    lastCalculation = {
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
        overheadValue,
        profitValue,
        rushValue,
        beforeVat,
        vatValue,
        afterVat
    };

    saveOrder(lastCalculation);
});

/* ============================================================
   حفظ الطلبات في LocalStorage
============================================================ */

function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem("cakeOrders") || "[]");
    orders.push(order);
    localStorage.setItem("cakeOrders", JSON.stringify(orders));
    loadOrders();
}

function loadOrders() {
    ordersTableBody.innerHTML = "";
    let orders = JSON.parse(localStorage.getItem("cakeOrders") || "[]");

    orders.forEach((o, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${o.date}</td>
            <td>${o.clientName}</td>
            <td>${o.clientPhone}</td>
            <td>${o.cakeName}</td>
            <td>${o.afterVat.toFixed(2)} ﷼</td>
            <td><button class="btn btn-ghost btn-sm" onclick="loadOrder(${index})">عرض</button></td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteOrder(${index})">حذف</button></td>
        `;
        ordersTableBody.appendChild(tr);
    });
}

function deleteOrder(index) {
    let orders = JSON.parse(localStorage.getItem("cakeOrders") || "[]");
    orders.splice(index, 1);
    localStorage.setItem("cakeOrders", JSON.stringify(orders));
    loadOrders();
}

function loadOrder(index) {
    let orders = JSON.parse(localStorage.getItem("cakeOrders") || "[]");
    const o = orders[index];

    clientNameInput.value = o.clientName;
    clientPhoneInput.value = o.clientPhone;
    cakeNameInput.value = o.cakeName;
    cakeShapeInput.value = o.cakeShape;
    cakeSizeInput.value = o.cakeSize;
    rectSizeInput.value = o.rectSize;
    cakeServingsInput.value = o.servings;
    pickupDateInput.value = o.pickupDate;
    pickupTimeInput.value = o.pickupTime;

    alert("تم تحميل الطلب داخل النموذج.");
}

loadOrders();

/* ============================================================
   دالة فتح واتساب (حل مشكلة الجوال)
============================================================ */

function openWhatsApp(msg) {
    const encoded = encodeURIComponent(msg);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
        window.location.href = "whatsapp://send?text=" + encoded;
    } else {
        window.open("https://wa.me/?text=" + encoded);
    }
}

/* ============================================================
   واتساب العميل
============================================================ */

whatsAppBtn.addEventListener("click", () => {
    if (!lastCalculation) return alert("احسب السعر أولاً");

    const o = lastCalculation;
    const pickupTimeFormatted = formatTime12(o.pickupTime);

    let msg = `*تفاصيل طلب الكيك – اليحي*\n\n`;
    msg += `العميل: ${o.clientName}\n`;
    msg += `الطلب: ${o.cakeName}\n`;
    msg += `موعد الاستلام: ${o.pickupDate} - ${pickupTimeFormatted}\n`;
    msg += `السعر النهائي: ${o.afterVat.toFixed(2)} ﷼\n\n`;
    msg += `شكرًا لاختياركم اليحي 🌟`;

    openWhatsApp(msg);
});

/* ============================================================
   واتساب الإنتاج
============================================================ */

whatsAppProductionBtn.addEventListener("click", () => {
    if (!lastCalculation) return alert("احسب السعر أولاً");

    const o = lastCalculation;
    const pickupTimeFormatted = formatTime12(o.pickupTime);

    let msg = `*طلب جديد – قسم الإنتاج*\n\n`;

    msg += `📌 *بيانات العميل*\n`;
    msg += `الاسم: ${o.clientName}\n`;
    msg += `الهاتف: ${o.clientPhone}\n\n`;

    msg += `📌 *تفاصيل الطلب*\n`;
    msg += `الكيك: ${o.cakeName}\n`;
    msg += `الشكل: ${o.cakeShape === "round" ? "دائري" : "مستطيل"}\n`;
    msg += `المقاس: ${o.cakeShape === "round" ? o.cakeSize : o.rectSize}\n`;
    msg += `عدد الحصص: ${o.servings}\n`;
    msg += `موعد الاستلام: ${o.pickupDate} - ${pickupTimeFormatted}\n\n`;

    msg += `📌 *الحشوات*\n`;
    fillingsTableBody.querySelectorAll("tr").forEach(row => {
        const name = row.children[0].children[0].value;
        const qty = row.children[1].children[0].value;
        const total = row.children[3].textContent;
        msg += `- ${name} × ${qty} = ${total} ﷼\n`;
    });
    msg += `إجمالي الحشوات: ${o.fillingsTotal.toFixed(2)} ﷼\n\n`;

    msg += `📌 *الإضافات*\n`;
    addonsTableBody.querySelectorAll("tr").forEach(row => {
        const name = row.children[0].children[0].value;
        const qty = row.children[1].children[0].value;
        const total = row.children[3].textContent;
        msg += `- ${name} × ${qty} = ${total} ﷼\n`;
    });
    msg += `إجمالي الإضافات: ${o.addonsTotal.toFixed(2)} ﷼\n\n`;

    msg += `📌 *التكاليف*\n`;
    msg += `التشغيل: ${o.overheadValue.toFixed(2)} ﷼\n`;
    msg += `الربح: ${o.profitValue.toFixed(2)} ﷼\n`;
    msg += `المستعجل: ${o.rushValue.toFixed(2)} ﷼\n\n`;

    msg += `📌 *السعر*\n`;
    msg += `قبل الضريبة: ${o.beforeVat.toFixed(2)} ﷼\n`;
    msg += `الضريبة (15%): ${o.vatValue.toFixed(2)} ﷼\n`;
    msg += `*السعر النهائي: ${o.afterVat.toFixed(2)} ﷼*\n\n`;

    msg += `📅 التاريخ: ${o.date}\n`;

    openWhatsApp(msg);
});

/* ============================================================
   تصدير Excel
============================================================ */

exportExcelBtn.addEventListener("click", () => {
    if (!lastCalculation) return alert("احسب السعر أولاً");

    const o = lastCalculation;

    let csv = "";
    csv += `التاريخ,${o.date}\n`;
    csv += `العميل,${o.clientName}\n`;
    csv += `الهاتف,${o.clientPhone}\n`;
    csv += `الطلب,${o.cakeName}\n`;
    csv += `السعر بعد الضريبة,${o.afterVat}\n`;

    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "cake_pricing.csv";
    a.click();

    URL.revokeObjectURL(url);
});
