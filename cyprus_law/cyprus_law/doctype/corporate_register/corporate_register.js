// Copyright (c) 2025, KAINOTOMO PH LTD and contributors
// For license information, please see license.txt

frappe.ui.form.on("Corporate Register", {
    refresh(frm) {
        // Fetch registered offices dynamically
        frappe.call({
            method: "frappe.client.get_list",
            args: {
                doctype: "Registered Office",
                filters: [
                    ["corporate_register", "=", frm.doc.name],
                    ["disabled", "=", 0]
                ],
                fields: ["name", "address", "address_html"],
                limit_page_length: 20
            },
            callback: function(r) {
                if (r.message) {
                    let registeredOfficesHtml = "<table class='table table-bordered'>";
                    r.message.forEach(function(row) {
                        registeredOfficesHtml += `<tr><td><a href="/app/registered-office/${row.name}">${row.address || ""}</a></td></tr>`;
                    });
                    registeredOfficesHtml += "</table>";
                    frm.set_df_property("registered_offices_html", "options", registeredOfficesHtml);
                }
            }
        });
    },
});
