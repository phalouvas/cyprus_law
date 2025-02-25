# Copyright (c) 2025, KAINOTOMO PH LTD and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class CorporateShareTrade(Document):
	
	def validate(self):
		self.nominal_value = self.nominal_value or 0
		self.premium_value = self.premium_value or 0
		self.discount_value = self.discount_value or 0
		self.total_value = self.total_value or 0
		total_value = self.nominal_value + self.premium_value - self.discount_value
		if self.total_value != total_value:
			frappe.throw("Total Value must be equal to Nominal Value + Premium Value - Discount Value")
