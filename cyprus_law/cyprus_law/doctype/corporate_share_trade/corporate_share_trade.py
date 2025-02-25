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

	def after_insert(self):
		self.update_shareholders_balance()
		
	def on_update(self):
		self.update_shareholders_balance()

	def update_shareholders_balance(self):
		share_trades = frappe.get_all("Corporate Share Trade", filters={"corporate_register": self.corporate_register, "disabled": 0}, fields=["name", "from_shareholder", "to_shareholder", "no_of_shares"])
		shareholders = {}
		for share_trade in share_trades:
			if share_trade.from_shareholder not in shareholders:
				shareholders[share_trade.from_shareholder] = 0
			if share_trade.to_shareholder not in shareholders:
				shareholders[share_trade.to_shareholder] = 0
			shareholders[share_trade.from_shareholder] -= share_trade.no_of_shares
			shareholders[share_trade.to_shareholder] += share_trade.no_of_shares
		for shareholder in shareholders:
			frappe.db.set_value("Corporate Shareholder", shareholder, "no_of_shares", shareholders[shareholder])