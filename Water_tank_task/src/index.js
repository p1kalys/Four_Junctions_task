function calculateWater(arr) {
  let n = arr.length;
  if (n <= 2) return 0;
  let maxHeight = Math.max(...arr);
  let left = 0,
    right = n - 1;
  let leftMax = 0,
    rightMax = 0;
  let water = 0;

  for(let i=0; i < arr.length; i++) {
    water += maxHeight - arr[i];
  }

  // while (left < right) {
  //   if (arr[left] < arr[right]) {
  //     arr[left] >= leftMax
  //       ? (leftMax = arr[left])
  //       : (water += leftMax - arr[left]);
  //     left++;
  //   } else {
  //     arr[right] >= rightMax
  //       ? (rightMax = arr[right])
  //       : (water += rightMax - arr[right]);
  //     right--;
  //   }
  // }
  return water;
}

function validateArray(arr) {
  return arr.every((item) => !isNaN(item) && item.trim() !== "");
}

function visualizeWater() {
  const input = document.getElementById("inputblock").value;
  const blocks = input.split(",").map((item) => item.trim());
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.innerText = "";

  if (!validateArray(blocks)) {
    errorMessage.innerText =
      "Please enter a valid list of numbers separated by commas.";
    return;
  }

  const numericBlocks = blocks.map(Number);
  const waterUnits = calculateWater(numericBlocks);
  document.getElementById(
    "input"
  ).innerText = `Block's heights: ${numericBlocks}`;
  document.getElementById(
    "output"
  ).innerText = `Water Stored: ${waterUnits} Units`;

  renderTable(numericBlocks, "statsTableContainer", true);
  renderTable(numericBlocks, "waterTableContainer", false);
}

function renderTable(
  blocks,
  containerId,
  includeHeights = true,
) {
  const maxBlockHeight = Math.max(...blocks);
  const tableContainer = document.getElementById(containerId);
  tableContainer.innerHTML = "";

  const table = document.createElement("table");

  const bottomRow = document.createElement("tr");
  blocks.forEach(() => {
    const td = document.createElement("td");
    bottomRow.appendChild(td);
  });
  table.appendChild(bottomRow);

  for (let i = maxBlockHeight; i > 0; i--) {
    const tr = document.createElement("tr");
    blocks.forEach((height, index) => {
      const td = document.createElement("td");
      if (includeHeights && height >= i) {
        td.classList.add("block");
      } else {
        const leftMax = Math.max(...blocks.slice(0, index + 1), maxBlockHeight);
        const rightMax = Math.max(...blocks.slice(index), maxBlockHeight);
        if (i <= leftMax && i <= rightMax && height < i) {
          td.classList.add("water");
        }
      }
      tr.appendChild(td);
    });
    table.appendChild(tr);
  }

  tableContainer.appendChild(table);
}
