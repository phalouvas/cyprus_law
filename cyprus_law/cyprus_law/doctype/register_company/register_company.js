// Copyright (c) 2025, KAINOTOMO PH LTD and contributors
// For license information, please see license.txt

frappe.ui.form.on("Register Company", {
    refresh(frm) {

        //setup address
        if (frm.doc.__islocal) {
			hide_field(["address_html", "registered_offices_section"]);
			frappe.contacts.clear_address_and_contact(frm);
		} else {
			unhide_field(["address_html", "registered_offices_section"]);
			frappe.contacts.render_address_and_contact(frm);
		}

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
                    let directorsHtml = "<table class='table table-bordered'>";
                    let secretariesHtml = "<table class='table table-bordered'>";
                    let companyShareholdersHtml = "<table class='table table-bordered'>";
                    let ultimateBeneficialOwnersHtml = "<table class='table table-bordered'>";

                    r.message.forEach(function(row) {
                        if (row.role === "Director") {
                            directorsHtml += `<tr><td><a href="/app/related-person/${row.name}">${row.person_name}</a></td><td>${row.role || ""}</td></tr>`;
                        }
                        if (row.role === "Secretary") {
                            secretariesHtml += `<tr><td><a href="/app/related-person/${row.name}">${row.person_name}</a></td><td>${row.role || ""}</td></tr>`;
                        }
                        if (row.role === "Shareholder") {
                            companyShareholdersHtml += `<tr><td><a href="/app/related-person/${row.name}">${row.person_name}</a></td></tr>`;
                        }
                        if (row.role === "Ultimate Beneficial Owner") {
                            ultimateBeneficialOwnersHtml += `<tr><td><a href="/app/related-person/${row.name}">${row.person_name}</a></td></tr>`;
                        }
                    });

                    directorsHtml += "</table>";
                    secretariesHtml += "</table>";
                    companyShareholdersHtml += "</table>";
                    ultimateBeneficialOwnersHtml += "</table>";

                    frm.set_df_property("directors_html", "options", directorsHtml);
                    frm.set_df_property("secretaries_html", "options", secretariesHtml);
                    frm.set_df_property("company_shareholders_html", "options", companyShareholdersHtml);
                    frm.set_df_property("ultimate_beneficial_owners_html", "options", ultimateBeneficialOwnersHtml);
                }
            }
        });
    },
});
