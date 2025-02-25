// Copyright (c) 2025, KAINOTOMO PH LTD and contributors
// For license information, please see license.txt

frappe.ui.form.on("Corporate Share Trade", {
    refresh(frm) {
        frm.set_query("from_shareholder", function() {
            return {
                filters: {
                    "corporate_register": frm.doc.corporate_register
                }
            };
        });
        frm.set_query("to_shareholder", function() {
            return {
                filters: {
                    "corporate_register": frm.doc.corporate_register
                }
            };
        });
    }
});
