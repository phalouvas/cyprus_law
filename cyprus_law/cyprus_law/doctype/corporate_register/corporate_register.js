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
                fields: ["name", "address", "start_date", "end_date"],
                limit_page_length: 20
            },
            callback: function(r) {
                if (r.message) {
                    let registeredOfficesHtml = "<table class='table table-bordered'>";
                    registeredOfficesHtml += `<thead>
                        <tr>
                            <th>Address</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>`;
                    r.message.forEach(function(row) {
                        registeredOfficesHtml += `<tr>
                            <td><a href="/app/registered-office/${row.name}">${row.address || ""}</a></td>
                            <td>${row.start_date || ""}</td>
                            <td>${row.end_date || ""}</td>
                        </tr>`;
                    });
                    registeredOfficesHtml += "</table>";
                    frm.set_df_property("registered_offices_html", "options", registeredOfficesHtml);
                }
            }
        });

        // Fetch corporate directors dynamically
        frappe.call({
            method: "frappe.client.get_list",
            args: {
                doctype: "Corporate Director",
                filters: [
                    ["corporate_register", "=", frm.doc.name],
                    ["disabled", "=", 0]
                ],
                fields: ["name", "full_name", "nationality", "address", "occupation", "dob", "id_number", "alternate_of", "appointed", "resigned", "birthplace"],
                limit_page_length: 20
            },
            callback: function(r) {
                if (r.message) {
                    let corporateDirectorsHtml = "<table class='table table-bordered'>";
                    corporateDirectorsHtml += `<thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>`;
                    r.message.forEach(function(row) {
                        corporateDirectorsHtml += `<tr>
                            <td><a href="/app/corporate-director/${row.name}">${row.full_name || ""}</a></td>
                            <td>${row.start_date || ""}</td>
                            <td>${row.end_date || ""}</td>
                        </tr>`;
                    });
                    corporateDirectorsHtml += "</table>";
                    frm.set_df_property("corporate_directors_html", "options", corporateDirectorsHtml);
                }
            }
        });
    },
});
