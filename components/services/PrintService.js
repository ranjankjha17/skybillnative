import axios from "axios"

const BASE_URL = 'https://skybillserver.vercel.app'
//const BASE_URL = 'http://172.24.0.168:5000'

export const getPrintBill = async (agrnumber) => {
  //console.log(agrnumber)
  try {
    const response = await axios.get(`${BASE_URL}/get-billdetails/${agrnumber}`);
    console.log(response.data.data)
    return response.data.data
  } catch (e) {
    console.log(e.message)
  }
}

export const generateHTMLContent = (printBillData) => {
  //     // const inputDateStr = printOrders[0].BDate
  //     // function conver_date(inputDateStr) {
  //     //     const inputDate = new Date(inputDateStr);
  //     //     const day = inputDate.getDate();
  //     //     const month = inputDate.getMonth() + 1;
  //     //     const year = inputDate.getFullYear();
  //     //     const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  //     //     return formattedDate
  //     // }
  //     const headerHTML = `
  //     <h2 style="text-align: center;">${printOrders[0].Company}</h2>
  //     <div style="display: flex; justify-content: space-between; padding-left: 5px; padding-right: 5px;">
  //         <p>Date: ${conver_date(inputDateStr)}</p>
  //         <p>Time: ${printOrders[0].BTime}</p>
  //     </div>
  //     <div style="display: flex; justify-content: space-between; padding-left: 5px; padding-right: 5px;">
  //         <p>Table No: ${printOrders[0].TableNo}</p>
  //         <p>KOT No: ${printOrders[0].KOT_No}</p>
  //     </div>
  // `;
  //     const itemsHTML = printOrders.map(item => {
  //         return (
  //             `
  //       <div class="item">
  //         <div class="itemName">${item.ItemName}</div> 
  //         <div class="qty">${item.Qty}</div>                   
  //       </div>
  //     `  )
  //     }

  //     ).join('');

  //     return `
  //       <!DOCTYPE html>
  //       <html>
  //         <head>
  //           <style>
  //             .item {
  //               display: flex;
  //               border: 1px solid #ccc;
  //               padding: 5px;
  //               margin: 5px;
  //             }
  //             .item > div {
  //               flex: 1;
  //               padding: 5px;
  //               border-right: 1px solid #ccc;
  //             }
  //             .item.total {
  //                 font-weight: bold;
  //                 background-color: #f0f0f0;
  //               }
  //           </style>
  //         </head>
  //         <body>
  //         ${headerHTML}     
  //         <div class="item">
  //         <div class="itemName">ItemName</div>             
  //         <div class="qty">Qty</div>                   
  //       </div>
  //           ${itemsHTML}

  //         </body>
  //       </html>
  //     `;


  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

};
