// Copyright (c) 2025, KAINOTOMO PH LTD and contributors
// For license information, please see license.txt

frappe.ui.form.on("Register Company", {
    refresh(frm) {
        // Fetch related persons dynamically
        frappe.call({
            method: "frappe.client.get_list",
            args: {
                doctype: "Related Person",
                filters: [
                    ["register_company", "=", frm.doc.name],
                    ["disabled", "=", 0]
                ],
                fields: ["name", "person_name", "type"],
                limit_page_length: 20
            },
            callback: function(r) {
                if (r.message) {
                    let html = "<table class='table table-bordered'><tr><th>Name</th><th>Type</th></tr>";
                    r.message.forEach(function(row) {
                        html += `<tr><td><a href="/app/related-person/${row.name}">${row.person_name}</a></td><td>${row.type || ""}</td></tr>`;
                    });
                    html += "</table>";
                    frm.set_df_property("company_structure_html", "options", html);
                }
            }
        });
    },
});
