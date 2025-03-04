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
                            <th>Nationality</th>
                            <th>Address</th>
                            <th>Occupation</th>
                            <th>Date of Birth</th>
                            <th>ID Number</th>
                            <th>Alternate Of</th>
                            <th>Appointed</th>
                            <th>Resigned</th>
                            <th>Birthplace</th>
                        </tr>
                    </thead>`;
                    r.message.forEach(function(row) {
                        corporateDirectorsHtml += `<tr>
                            <td><a href="/app/corporate-director/${row.name}">${row.full_name || ""}</a></td>
                            <td>${row.nationality || ""}</td>
                            <td>${row.address || ""}</td>
                            <td>${row.occupation || ""}</td>
                            <td>${row.dob || ""}</td>
                            <td>${row.id_number || ""}</td>
                            <td>${row.alternate_of || ""}</td>
                            <td>${row.appointed || ""}</td>
                            <td>${row.resigned || ""}</td>
                            <td>${row.birthplace || ""}</td>
                        </tr>`;
                    });
                    corporateDirectorsHtml += "</table>";
                    frm.set_df_property("directors_html", "options", corporateDirectorsHtml);
                }
            }
        });

        // Fetch corporate secretaries dynamically
        frappe.call({
            method: "frappe.client.get_list",
            args: {
                doctype: "Corporate Secretary",
                filters: [
                    ["corporate_register", "=", frm.doc.name],
                    ["disabled", "=", 0]
                ],
                fields: ["name", "full_name", "nationality", "address", "occupation", "dob", "id_number", "alternate_of", "appointed", "resigned", "birthplace"],
                limit_page_length: 20
            },
            callback: function(r) {
                if (r.message) {
                    let corporateSecretariesHtml = "<table class='table table-bordered'>";
                    corporateSecretariesHtml += `<thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Nationality</th>
                            <th>Address</th>
                            <th>Occupation</th>
                            <th>Date of Birth</th>
                            <th>ID Number</th>
                            <th>Alternate Of</th>
                            <th>Appointed</th>
                            <th>Resigned</th>
                            <th>Birthplace</th>
                        </tr>
                    </thead>`;
                    r.message.forEach(function(row) {
                        corporateSecretariesHtml += `<tr>
                            <td><a href="/app/corporate-secretary/${row.name}">${row.full_name || ""}</a></td>
                            <td>${row.nationality || ""}</td>
                            <td>${row.address || ""}</td>
                            <td>${row.occupation || ""}</td>
                            <td>${row.dob || ""}</td>
                            <td>${row.id_number || ""}</td>
                            <td>${row.alternate_of || ""}</td>
                            <td>${row.appointed || ""}</td>
                            <td>${row.resigned || ""}</td>
                            <td>${row.birthplace || ""}</td>
                        </tr>`;
                    });
                    corporateSecretariesHtml += "</table>";
                    frm.set_df_property("secretaries_html", "options", corporateSecretariesHtml);
                }
            }
        });

        // Fetch corporate shareholders dynamically
        frappe.call({
            method: "frappe.client.get_list",
            args: {
                doctype: "Corporate Shareholder",
                filters: [
                    ["corporate_register", "=", frm.doc.name],
                    ["disabled", "=", 0]
                ],
                fields: ["name", "full_name", "nationality", "address", "occupation", "dob", "id_number", "start_date", "end_date", "class_of_shares", "no_of_shares", "nominal_value"],
                limit_page_length: 20
            },
            callback: function(r) {
                if (r.message) {
                    let corporateShareholdersHtml = "<table class='table table-bordered'>";
                    corporateShareholdersHtml += `<thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Nationality</th>
                            <th>Address</th>
                            <th>Occupation</th>
                            <th>Class of Shares</th>
                            <th>No of Shares</th>
                            <th>Nominal Value</th>
                            <th>ID Number</th>
                            <th>Entered as Shareholder</th>
                            <th>Ceased to be Shareholder</th>
                        </tr>
                    </thead>`;
                    r.message.forEach(function(row) {
                        corporateShareholdersHtml += `<tr>
                            <td><a href="/app/corporate-shareholder/${row.name}">${row.full_name || ""}</a></td>
                            <td>${row.nationality || ""}</td>
                            <td>${row.address || ""}</td>
                            <td>${row.occupation || ""}</td>
                            <td>${row.class_of_shares || ""}</td>
                            <td>${row.no_of_shares || ""}</td>
                            <td>${row.nominal_value || ""}</td>
                            <td>${row.id_number || ""}</td>
                            <td>${row.start_Date || ""}</td>
                            <td>${row.end_date || ""}</td>
                        </tr>`;
                    });
                    corporateShareholdersHtml += "</table>";
                    frm.set_df_property("shareholders_html", "options", corporateShareholdersHtml);
                }
            }
        });

        // Fetch corporate share trade dynamically
        frappe.call({
            method: "frappe.client.get_list",
            args: {
                doctype: "Corporate Share Trade",
                filters: [
                    ["corporate_register", "=", frm.doc.name],
                    ["disabled", "=", 0]
                ],
                fields: ["name", "trade_date", "type", "dns_from_no", "dns_to_no", "no_of_shares", "from_shareholder", "from_shareholder_name", "to_shareholder", "to_shareholder_name", "nominal_value", "premium_value", "discount_value", "total_value", "notes"],
                limit_page_length: 20
            },
            callback: function(r) {
                if (r.message) {
                    let corporateSharesHtml = "<table class='table table-bordered'>";
                    corporateSharesHtml += `<thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>DNS From No</th>
                            <th>DNS To No</th>
                            <th>Number of shares</th>
                            <th>From Shareholder</th>
                            <th>To Shareholder</th>
                            <th>Nominal Value</th>
                            <th>Premium Value</th>
                            <th>Discount Value</th>
                            <th>Total Value</th>
                            <th>Notes</th>
                        </tr>
                    </thead>`;
                    r.message.forEach(function(row) {
                        corporateSharesHtml += `<tr>
                            <td><a href="/app/corporate-share-trade/${row.name}">${row.trade_date || ""}</a></td>
                            <td>${row.type || ""}</td>
                            <td>${row.dns_from_no || ""}</td>
                            <td>${row.dns_to_no || ""}</td>
                            <td>${row.no_of_shares || ""}</td>
                            <td><a href="/app/corporate-shareholder/${row.from_shareholder}">${row.from_shareholder_name || ""}</a></td>
                            <td><a href="/app/corporate-shareholder/${row.to_shareholder}">${row.to_shareholder_name || ""}</a></td>
                            <td>${row.nominal_value || ""}</td>
                            <td>${row.premium_value || ""}</td>
                            <td>${row.discount_value || ""}</td>
                            <td>${row.total_value || ""}</td>
                            <td>${row.notes || ""}</td>
                        </tr>`;
                    });
                    corporateSharesHtml += "</table>";
                    frm.set_df_property("shares_html", "options", corporateSharesHtml);
                }
            }
        });

    },
});
