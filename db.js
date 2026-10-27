// Local Database Engine for Sir Tech Platform

// 1. حفظ واسترجاع بيانات المستخدم (Users & Sessions)
const SirDB = {
    // تسجيل أو تحديث بيانات المستخدم
    saveUser: function(userData) {
        const user = {
            id: userData.id || 'USER_' + Date.now(),
            name: userData.name || 'صفاء الغفيص',
            email: userData.email || 'safa@example.com',
            role: userData.role || 'User',
            createdAt: new Date().toISOString()
        };
        localStorage.setItem('sir_tech_user', JSON.stringify(user));
        return user;
    },

    // جلب بيانات المستخدم الحالي
    getUser: function() {
        const data = localStorage.getItem('sir_tech_user');
        return data ? JSON.parse(data) : null;
    },

    // 2. حفظ واسترجاع بيانات السيارات والبطاريات (EV & Battery Stats)
    saveVehicleData: function(vehicleData) {
        const defaultData = {
            model: "Ceer EXOBOT EV",
            batteryLevel: 88, // نسبة الشحن %
            batteryHealth: 96, // صحة البطارية SOH %
            estimatedRange: 410, // المدى المتبقي كم
            chargingStatus: "Standby", // حالة الشحن
            lastSync: new Date().toLocaleTimeString('ar-SA')
        };
        const finalData = { ...defaultData, ...vehicleData };
        localStorage.setItem('sir_tech_ev_stats', JSON.stringify(finalData));
        return finalData;
    },

    // جلب بيانات السيارة والبطارية
    getVehicleData: function() {
        const data = localStorage.getItem('sir_tech_ev_stats');
        return data ? JSON.parse(data) : this.saveVehicleData({}); // إنشاء بيانات افتراضية لو كانت فارغة
    }
};

// تهيئة التخزين تلقائياً عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    if (!SirDB.getUser()) {
        SirDB.saveUser({ name: "صفاء الغفيص", email: "safa@sirtech.sa" });
    }
    if (!localStorage.getItem('sir_tech_ev_stats')) {
        SirDB.saveVehicleData({});
    }
});