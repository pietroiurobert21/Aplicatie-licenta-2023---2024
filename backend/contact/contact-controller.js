const express = require("express");

const Employee = require("../database/models/employee");
const Organization = require("../database/models/organization");
const Contact = require("../database/models/contact")

Organization.hasMany(Contact, {foreignKey: "CompanyId"})

