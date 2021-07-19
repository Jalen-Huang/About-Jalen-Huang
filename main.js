/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global saveGame */

window.onload = function() {
    document.getElementById("slotMultiplierUpgrade").innerHTML = "Upgrade Slot Machine (Currently Level " + gameData.slotMultiplier + ") Cost: $" + gameData.slotMultiplierCost;
    update("money", "$" + gameData.money);
};

var gameData = {
    money: 0,
    slotWinnings: 1,
    slotMultiplier: 1,
    slotMultiplierCost: 10,
    lastTick: Date.now()
};

function tab(tab) {
  // Hide all tabs, then show the one the user selected.
  document.getElementById("spinSlotMachineMenu").style.display = "none"
  document.getElementById("shopMenu").style.display = "none"
  document.getElementById(tab).style.display = "inline-block"
}
// Go to a tab for the first time, so not all show
tab("spinSlotMachine")

function update(id, content){
    document.getElementById(id).innerHTML = content;
}

function spinMachine() {
    gameData.money +=gameData.slotWinnings * gameData.slotMultiplier;
    update("money", "$" + gameData.money);
}

function buySlotMultiplierUpgrade() {
    if (gameData.money >= gameData.slotMultiplierCost){
        gameData.money -= gameData.slotMultiplierCost;
        gameData.slotMultiplier += 1;
        gameData.slotMultiplierCost *= 2;
        update("money", "$" + format(gameData.money, "engineering"));
        update("slotMultiplierUpgrade", "Upgrade Slot Machine (Currently Level " + format(gameData.slotMultiplier, "scientific") + ") Cost: $" + format(gameData.slotMultiplierCost, "engineering"));
    }
}

function format(number, type) {
	let exponent = Math.floor(Math.log10(number));
	let mantissa = number / Math.pow(10, exponent);
	if (exponent < 3) return number.toFixed(1);
	if (type === "scientific") return mantissa.toFixed(2) + "e" + exponent;
	if (type === "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3);
}

var mainGameLoop = window.setInterval(function() {
    diff = Date.now() - gameData.lastTick;
    gameData.lastTick = Date.now();
    gameData.money += gameData.slotWinnings * gameData.slotMultiplier * (diff / 1000);
    update("money", "$" + gameData.money);
    spinMachine();
}, 1000);

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("idleSlotMachineSave", JSON.stringify(gameData));
}, 15000);

var savegame = JSON.parse(localStorage.getItem("idleSlotMachineSave"));
if (savegame !== null) {
    gameData = savegame;
}
if (typeof savegame.dwarves !== "undefined") gameData.dwarves = savegame.dwarves;
if (typeof saveGame.money !== "undefined") gameData.money = saveGame.money;
if (typeof saveGame.slotmultiplier !== "undefined") gameData.slotMultiplier = saveGame.slotMultiplier;
if (typeof saveGame.slotMultiplierCost !== "undefined") gameData.slotMultiplierCost = saveGame.slotMultiplierCost;
if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;
