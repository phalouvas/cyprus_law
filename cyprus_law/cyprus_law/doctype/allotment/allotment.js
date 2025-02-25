// Copyright (c) 2025, KAINOTOMO PH LTD and contributors
// For license information, please see license.txt

frappe.ui.form.on("Allotment", {
    refresh(frm) {
        frm.set_query("corporate_shareholder", function() {
            return {
                filters: {
                    "corporate_register": frm.doc.corporate_register
                }
            };
        });
    }
});
