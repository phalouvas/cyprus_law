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
                fields: ["name", "person_name", "role"],
                limit_page_length: 20
            },
            callback: function(r) {
                if (r.message) {
                    let companyStructureHtml = "<table class='table table-bordered'><tr><th>Name</th><th>Role</th></tr>";
                    let companyShareholdersHtml = "<table class='table table-bordered'><tr><th>Name</th><th>Role</th></tr>";
                    let ultimateBeneficialOwnersHtml = "<table class='table table-bordered'><tr><th>Name</th><th>Role</th></tr>";

                    r.message.forEach(function(row) {
                        if (["Director", "Secretary"].includes(row.role)) {
                            companyStructureHtml += `<tr><td><a href="/app/related-person/${row.name}">${row.person_name}</a></td><td>${row.role || ""}</td></tr>`;
                        }
                        if (row.role === "Shareholder") {
                            companyShareholdersHtml += `<tr><td><a href="/app/related-person/${row.name}">${row.person_name}</a></td><td>${row.role || ""}</td></tr>`;
                        }
                        if (row.role === "Ultimate Beneficial Owner") {
                            ultimateBeneficialOwnersHtml += `<tr><td><a href="/app/related-person/${row.name}">${row.person_name}</a></td><td>${row.role || ""}</td></tr>`;
                        }
                    });

                    companyStructureHtml += "</table>";
                    companyShareholdersHtml += "</table>";
                    ultimateBeneficialOwnersHtml += "</table>";

                    frm.set_df_property("company_structure_html", "options", companyStructureHtml);
                    frm.set_df_property("company_shareholders_html", "options", companyShareholdersHtml);
                    frm.set_df_property("ultimate_beneficial_owners_html", "options", ultimateBeneficialOwnersHtml);
                }
            }
        });
    },
});
