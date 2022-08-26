<template>
  <ModalWrapper
    submit-title="Yes"
    cancelText="No"
    title="Print payment slip"
    id="printInvoice"
    @ok="ok()"
    @hide="$bvModal.hide('printInvoice?')"
    size="md"
  >
    <div>
      <h5 class="text-center">Please confirm this action</h5>
      <p class="text-info text-14 text-center p-2">
        Do you want to print the payment slip for this transaction ?
      </p>
    </div>
    <div class="d-none">
      <div style="width: 50rem" id="text" class="ticket">
        <!-- <div style="display: flex; width: 22rem; justify-content: center;">
              <img width="100" height="100" class="logo" src="~/static/icon.png/" alt="">
             </div> -->
        <h2 style="margin-bottom: 0rem; width: 20rem; text-align: center">
          Reciept
        </h2>
        <p style="width: 20rem; margin-bottom: 0rem">
          Transaction Date: {{ transactionDate }}
          <br />
          Patient name:
          {{ data.firstname + ' ' + data.middlename + ' ' + data.lastname }}
          <br />
          UHID: <span style="font-size: 13px">{{ data.uhid }}</span>
        </p>
        <h3 style="font-size: 1.2rem; margin: 0.3rem; width: 20rem">
          Invoice lines
        </h3>
        <table
          style="
            border: 1px solid black;
            border-collapse: collapse;
            width: 20rem;
            text-align: center;
          "
        >
          <thead>
            <tr style="text-align: center">
              <th style="border: 1px solid black">Qty</th>
              <th style="border: 1px solid black">Description</th>
              <th style="border: 1px solid black">Selling price</th>
            </tr>
          </thead>
          <tbody v-if="reciept.bill_lines">
            <tr
              v-for="(item, index) in reciept.bill_lines"
              :key="index"
              style="text-align: center"
            >
              <td style="border: 1px solid black">{{ item.quantity }}</td>
              <td style="border: 1px solid black">{{ item.description }}</td>
              <td style="border: 1px solid black">
                {{
                  item.selling_price
                    ? item.selling_price.toLocaleString('en-US')
                    : ''
                }}
              </td>
            </tr>
          </tbody>
          <!-- data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODdweCIgaGVpZ2h0PSIyMnB4IiB2aWV3Qm94PSIwIDAgODcgMjIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU0LjEgKDc2NDkwKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5kYXZlLWxvZ288L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iU3ltYm9scyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImhlYWRlci9ob21lIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTAuMDAwMDAwLCAtMjkuMDAwMDAwKSIgZmlsbD0iIzNDM0MzQyI+CiAgICAgICAgICAgIDxnIGlkPSJoZWFkZXIiPgogICAgICAgICAgICAgICAgPGcgaWQ9ImJyYW5kaW5nL2xvZ28vYmxhY2siIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwLjAwMDAwMCwgMjkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9ImFsbCI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zNC45MzcyMDE5LDEzLjUxNzM3MSBMMzQuOTM3MjAxOSwxMi45MTI3ODE5IEMzMS4yMDg3NjgzLDExLjgzNTMzMDkgMjguMTQ4MDYxMSwxMi4yMTMwMDc2IDI4LjE2MTc2OTQsMTUuMDE0NzMwMyBDMjguMTc3Njg4NywxOC4yNTUxNzk1IDM0LjkzNzIwMTksMTcuOTk4MDcwNCAzNC45MzcyMDE5LDEzLjUxNzM3MSBaIE02OS43Njc4MTI2LDEzLjI0OTQ1MyBDNzAuMDY2ODk5MSwxNS4zOTY3MTc3IDcyLjQ2NzUzNjYsMTYuNjk2OTM2NSA3NC4zMDExMjQsMTYuNjk2OTM2NSBDNzUuOTczMzU5MiwxNi42OTY5MzY1IDc3LjAyODg4MDQsMTYuMzgzMzY5OCA3OC4xMjg1NDcyLDE1LjU5NzU5MyBDNzkuMDQzNDY0NywxNC45NDM3NjM3IDgwLjI3MDkzMzEsMTQuOTE4ODE4NCA4MS4xOTYwMDQsMTUuNTU4NjQzMyBDODIuNzE3NDgyLDE2LjYxMDk0MDkgODIuNzAwMjY1MywxOC44NTcxMTE2IDgxLjE1MzE4MjgsMTkuODcyMjEwMSBDNzkuNDU5MDk1NSwyMC45ODQwMjYzIDc2Ljk5Njg3NDksMjIgNzMuNjU0ODMyNCwyMiBDNjcuODkxNDA0LDIyIDYzLjIwNTEyODIsMTcuMDY0NzcwMiA2My4yMDUxMjgyLDEwLjk5NzU5MyBDNjMuMjA1MTI4Miw0LjkzMjgyMjc2IDY3Ljg5MTQwNCw4Ljg4MTc4NDJlLTE2IDczLjY1NDgzMjQsOC44ODE3ODQyZS0xNiBDNzguODE3NDM5Myw4Ljg4MTc4NDJlLTE2IDgzLjI2NDQ0Niw0LjA1MDEwOTQxIDgzLjk5NzA0MjIsOS40MjIxMDA2NiBDODQuMDA0MTA1NSw5LjQ3NjgwNTI1IDg0LjAxMTE2ODgsOS41NTI1MTY0MSA4NC4wMTgyMzIsOS42NDA0ODE0IEM4NC4wODA2OTgxLDEwLjU5Mjc3OSA4My43NDY1MTU5LDExLjUwMjYyNTggODMuMDc4MzcyMywxMi4xOTc1OTMgQzgyLjQwODI0MjEsMTIuODk0MzEwNyA4MS40NTIyNjkyLDEzLjI0OTQ1MyA4MC40ODA4NDU0LDEzLjI0OTQ1MyBMNjkuNzY3ODEyNiwxMy4yNDk0NTMgWiBNNzcuNTk2ODEzNSw5LjE1NjQ1NTE0IEM3Ny41OTY4MTM1LDguMzA0NTk1MTkgNzYuOTc5NDM3NCw1LjE0ODc5NjUgNzMuNTU2NjA4NSw1LjE0ODc5NjUgQzcxLjU0Mzc5LDUuMTQ4Nzk2NSA2OS43NjI5NTY2LDcuMDM3NDE3OTQgNjkuNzYyOTU2Niw5LjE1NjQ1NTE0IEw3Ny41OTY4MTM1LDkuMTU2NDU1MTQgWiBNMzEuODg5MDk3NSw4Ljg4MTc4NDJlLTE2IEMzNC40NzUzMjEsOC44ODE3ODQyZS0xNiAzNi43Mjg1NjU3LDAuNjgwNTE4Mzk1IDM4LjU4NjI2LDIuMDIyOTU1ODEgQzQxLjcwMTgwMDMsNC4yNzM2OTkyOSA0MS42NTUzNjksNy43ODkyMDA0MyA0MS42Mzc5MDIsOS4xMTI2MDA4MyBDNDEuNjM2Nzk2NSw5LjE5NDY1NjkxIDQxLjYzNTY5MSw5LjI2ODE3OTE1IDQxLjYzNTY5MSw5LjMzMTQxNzAzIEw0MS42MzU2OTEsMTguNTc2NDAxNyBDNDEuNjM1NjkxLDIwLjM2NzE5MzUgNDAuMTYzNTk3NiwyMS44MjQwNzE4IDM4LjM1NDEwMzUsMjEuODI0MDcxOCBMMzguMjM0NzA4NywyMS44MjQwNzE4IEMzNy4zNTg3MDQ4LDIxLjgyNDA3MTggMzYuNTM0ODgwOSwyMS40ODYyMTk2IDM1LjkxNDY5MTMsMjAuODcyNDQwMSBDMzUuNTgxNzEyNiwyMC41NDMxMjE3IDM1LjMyODc3MjUsMjAuMTUyNTM0OCAzNS4xNjYyNjMsMTkuNzI2MDYyIEMzNC4yMzU0MjU5LDIwLjYwNzY3MjUgMzIuMzU3NjExNCwyMiAyOS4wODI2NTY5LDIyIEMyNC41MTUzNjQ1LDIyIDIxLjU2NDEwMjYsMTkuMjQyMDQwNiAyMS41NjQxMDI2LDE0Ljk3NDI0OTMgQzIxLjU2NDEwMjYsMTEuNDA0NDgxOCAyNC40OTcyMzQyLDguODI0NjM4NyAyOS4wMzY0NDY3LDguNDAxNjY2OTggQzMxLjYzMTUxNDMsOC4xNjA1MzE1MiAzMy44NzkwMTA0LDguNjU1OTMxNDEgMzQuOTUzMzQyMyw4Ljk1OTQyOTQ5IEwzNC45NTMxMjEyLDguNzEwODU0MjggQzM0Ljk1MzEyMTIsNC45MjU5OTAzOSAzMC40Mzg4OTMxLDUuMzYyMDkxMDkgMjcuMDM3Njg5Nyw2LjE0MDQyMDMzIEMyMy4wODI2MjcyLDcuMDQ4NzI2MzkgMjEuODk2MTk2OSwyLjAyNjQ1Njg3IDI1LjI4OTg4MjksMC45Nzc4ODk2MTcgQzI2Ljc2MzA4MTcsMC41MjI3NTE5MTIgMjguODQ0NzUxOCw4Ljg4MTc4NDJlLTE2IDMxLjg4OTA5NzUsOC44ODE3ODQyZS0xNiBaIE0zLjM4Mzc2NjEyLDguODgxNzg0MmUtMTYgTDkuNjgwMTgwOTMsOC44ODE3ODQyZS0xNiBDMTUuNzIzMDM4Myw4Ljg4MTc4NDJlLTE2IDIwLjcxOTk0MjksNC42ODg0ODIwNSAyMC44MTg5MzYsMTAuNDUxODU3OCBDMjAuODY4NDMyNiwxMy4zMjc3NjU1IDE5Ljc1MTE1OTgsMTYuMDQwMDgzNCAxNy42NzMyMDM1LDE4LjA4ODg4MTQgQzE1LjU5NDM0NzIsMjAuMTM4MTE1NiAxMi44MTY5MTQxLDIxLjI2NjY2NjcgOS44NTI1MTkwMiwyMS4yNjY2NjY3IEwzLjM4Mzc2NjEyLDIxLjI2NjY2NjcgQzEuNTE3OTcwMDgsMjEuMjY2NjY2NyAwLDE5Ljc5NTIzMTUgMCwxNy45ODYxNDcgTDAsMy4yODA1MTk2NiBDMCwxLjQ3MTQzNTIxIDEuNTE3OTcwMDgsOC44ODE3ODQyZS0xNiAzLjM4Mzc2NjEyLDguODgxNzg0MmUtMTYgWiBNNi41OTIwNDQzNywxNi4zMDMzNTM4IEw4LjM4NDQ5NTQ4LDE2LjMwMzM1MzggQzEyLjIxMDEzMTEsMTYuMzAzMzUzOCAxNC4yMjg2OTE1LDEzLjc2NDY1OTEgMTQuMjI4NjkxNSwxMC42MzMzMzMzIEMxNC4yMjg2OTE1LDcuNTAxNzg5NCAxMi4yNDc0Nzg1LDQuOTYzNTMwOTQgOC4zODQ0OTU0OCw0Ljk2MzUzMDk0IEw2LjU5MjA0NDM3LDQuOTYzNTMwOTQgTDYuNTkyMDQ0MzcsMTYuMzAzMzUzOCBaIE01Mi43OTQ5MjYsMTMuMjUyNjAzNCBMNTYuNzk1NjkxMiwyLjE3ODc1Mjk1IEM1Ny4yNjgxMjA5LDAuODcxMzI2MTI2IDU4LjUwOTYxNjksOC44ODE3ODQyZS0xNiA1OS45MDA0MTY0LDguODgxNzg0MmUtMTYgQzYyLjMwODc1NjcsOC44ODE3ODQyZS0xNiA2My45MDYyMTY4LDIuNDk0NzIzNTUgNjIuODk4MDg5Nyw0LjY4MDkxNjI0IEw1NS43OTQ1Njk1LDIwLjA4MDc2MzEgQzU1LjI1NDkzMTQsMjEuMjUwNTU0NSA1NC4wODM3MDg3LDIyIDUyLjc5NDkyNiwyMiBDNTEuNTA1OTI0MywyMiA1MC4zMzQ3MDE2LDIxLjI1MDU1NDUgNDkuNzk1MDYzNSwyMC4wODA3NjMxIEw0Mi42OTE3NjIzLDQuNjgwOTE2MjQgQzQxLjY4MzQxNjIsMi40OTQ3MjM1NSA0My4yODA4NzYzLDguODgxNzg0MmUtMTYgNDUuNjg5NDM1NSw4Ljg4MTc4NDJlLTE2IEM0Ny4wODAwMTYxLDguODgxNzg0MmUtMTYgNDguMzIxNTEyMiwwLjg3MTMyNjEyNiA0OC43OTM5NDE4LDIuMTc4NzUyOTUgTDUyLjc5NDkyNiwxMy4yNTI2MDM0IFogTTg3LDIuMTk5OTk5OTcgQzg3LDIuODE3OTc3NDggODYuNzg2OTQ5MSwzLjMzNzA3ODYxIDg2LjM1NDU4MDcsMy43NjM0ODMwOSBDODUuOTIyMjEyNyw0LjE4OTg4NzU4IDg1LjM4OTU4NTEsNC4zOTk5OTk5NCA4NC43NjkyMzA4LDQuMzk5OTk5OTQgQzg0LjE0MjYxMDMsNC4zOTk5OTk5NCA4My42MTYyNDg4LDQuMTg5ODg3NTggODMuMTgzODgwOCwzLjc2MzQ4MzA5IEM4Mi43NTE1MTI1LDMuMzM3MDc4NjEgODIuNTM4NDYxNSwyLjgxNzk3NzQ4IDgyLjUzODQ2MTUsMi4xOTk5OTk5NyBDODIuNTM4NDYxNSwxLjU4MjAyMjQ1IDgyLjc1MTUxMjUsMS4wNjI5MjEzMyA4My4xODM4ODA4LDAuNjM2NTE2ODQ1IEM4My42MTYyNDg4LDAuMjEwMTEyMzU2IDg0LjE0MjYxMDMsLTUuMzI5MDcwNTJlLTE1IDg0Ljc2OTIzMDgsLTUuMzI5MDcwNTJlLTE1IEM4NS4zODk1ODUxLC01LjMyOTA3MDUyZS0xNSA4NS45MjIyMTI3LDAuMjEwMTEyMzU2IDg2LjM1NDU4MDcsMC42MzY1MTY4NDUgQzg2Ljc4Njk0OTEsMS4wNjI5MjEzMyA4NywxLjU4MjAyMjQ1IDg3LDIuMTk5OTk5OTcgWiBNODYuNzA1NDg4MywyLjE5OTk5OTk3IEM4Ni43MDU0ODgzLDEuNjc0NzE5MDggODYuNTE3NTAyLDEuMjIzNTk1NDkgODYuMTM1MjYzNiwwLjg1MjgwODk3NSBDODUuNzU5MjkxMSwwLjQ3NTg0MjY4OCA4NS4zMDE4NTgxLDAuMjkwNDQ5NDM0IDg0Ljc2OTIzMDgsMC4yOTA0NDk0MzQgQzg0LjIzNjYwMzEsMC4yOTA0NDk0MzQgODMuNzc5MTcwMSwwLjQ3NTg0MjY4OCA4My40MDMxOTc5LDAuODUyODA4OTc1IEM4My4wMjA5NTkyLDEuMjIzNTk1NDkgODIuODMyOTczMywxLjY3NDcxOTA4IDgyLjgzMjk3MzMsMi4xOTk5OTk5NyBDODIuODMyOTczMywyLjcyNTI4MDg1IDgzLjAyMDk1OTIsMy4xNzY0MDQ0NiA4My40MDMxOTc5LDMuNTQ3MTkwOTcgQzgzLjc3OTE3MDEsMy45MjQxNTcyNSA4NC4yMzY2MDMxLDQuMTA5NTUwNSA4NC43NjkyMzA4LDQuMTA5NTUwNSBDODUuMzAxODU4MSw0LjEwOTU1MDUgODUuNzU5MjkxMSwzLjkyNDE1NzI1IDg2LjE0MTUyOTgsMy41NDcxOTA5NyBDODYuNTE3NTAyLDMuMTc2NDA0NDYgODYuNzA1NDg4MywyLjcyNTI4MDg1IDg2LjcwNTQ4ODMsMi4xOTk5OTk5NyBaIE04NS4wODI1NDEsMi4zNzMwMzM2NyBMODUuNzc4MDg5OSwzLjQ3MzAzMzY2IEw4NS4yOTU1OTE5LDMuNDczMDMzNjYgTDg0LjY3NTIzNzYsMi40MTYyOTIxIEw4NC4zNTU2NjEyLDIuNDE2MjkyMSBMODQuMzU1NjYxMiwzLjQ3MzAzMzY2IEw4My45NTQ2MjQsMy40NzMwMzM2NiBMODMuOTU0NjI0LDAuOTI2OTY2Mjc3IEw4NC44NDQ0MjUxLDAuOTMzMTQ2MDUxIEM4NS4wNzAwMDg3LDAuOTMzMTQ2MDUxIDg1LjI1Nzk5NDksMS4wMDExMjM1OCA4NS40MTQ2NSwxLjEzMDg5ODg2IEM4NS41NzEzMDUyLDEuMjYwNjc0MTQgODUuNjUyNzY1NiwxLjQzOTg4NzYyIDg1LjY1Mjc2NTYsMS42Njg1MzkzIEM4NS42NTI3NjU2LDEuODg0ODMxNDMgODUuNTk2MzY5OCwyLjA0NTUwNTU4IDg1LjQ3NzMxMiwyLjE1Njc0MTU0IEM4NS4zNjQ1MjA0LDIuMjY3OTc3NDkgODUuMjMyOTI5OSwyLjM0MjEzNDc5IDg1LjA4MjU0MSwyLjM3MzAzMzY3IFogTTg1LjIzOTE5NjEsMS42NzQ3MTkwOCBDODUuMjM5MTk2MSwxLjM5NjYyOTE5IDg1LjA1NzQ3NjMsMS4yNjA2NzQxNCA4NC43MDAzMDI2LDEuMjYwNjc0MTQgTDg0LjM1NTY2MTIsMS4yNjA2NzQxNCBMODQuMzU1NjYxMiwyLjA4ODc2NDAxIEw4NC43MDAzMDI2LDIuMDg4NzY0MDEgQzg1LjA1NzQ3NjMsMi4wODg3NjQwMSA4NS4yMzkxOTYxLDEuOTUyODA4OTYgODUuMjM5MTk2MSwxLjY3NDcxOTA4IFoiIGlkPSJjb2xvciIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4= -->
        </table>
        <p style="text-align: end; width: 19rem">
          Total: {{ totalInvoice.toLocaleString('en-US') }}
        </p>

        <h3 style="font-size: 1.2rem; margin: 0.3rem; width: 20rem">
          Bill lines
        </h3>
        <table
          style="
            border: 1px solid black;
            border-collapse: collapse;
            width: 20rem;
            text-align: center;
          "
        >
          <thead>
            <tr style="text-align: center">
              <th style="border: 1px solid black">Method</th>
              <th style="border: 1px solid black">Type</th>
              <th style="border: 1px solid black">Amount</th>
            </tr>
          </thead>
          <tbody v-if="reciept.payment_lines">
            <tr
              v-for="(item, index) in reciept.payment_lines"
              :key="index"
              style="text-align: center"
            >
              <td style="border: 1px solid black">
                {{ item.payment_method.name }}
              </td>
              <td style="border: 1px solid black">{{ item.payment_type }}</td>
              <td style="border: 1px solid black">
                {{
                  item.total_amount
                    ? item.total_amount.toLocaleString('en-US')
                    : ''
                }}
              </td>
            </tr>
          </tbody>
          <!-- data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODdweCIgaGVpZ2h0PSIyMnB4IiB2aWV3Qm94PSIwIDAgODcgMjIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU0LjEgKDc2NDkwKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5kYXZlLWxvZ288L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iU3ltYm9scyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImhlYWRlci9ob21lIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTAuMDAwMDAwLCAtMjkuMDAwMDAwKSIgZmlsbD0iIzNDM0MzQyI+CiAgICAgICAgICAgIDxnIGlkPSJoZWFkZXIiPgogICAgICAgICAgICAgICAgPGcgaWQ9ImJyYW5kaW5nL2xvZ28vYmxhY2siIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwLjAwMDAwMCwgMjkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9ImFsbCI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zNC45MzcyMDE5LDEzLjUxNzM3MSBMMzQuOTM3MjAxOSwxMi45MTI3ODE5IEMzMS4yMDg3NjgzLDExLjgzNTMzMDkgMjguMTQ4MDYxMSwxMi4yMTMwMDc2IDI4LjE2MTc2OTQsMTUuMDE0NzMwMyBDMjguMTc3Njg4NywxOC4yNTUxNzk1IDM0LjkzNzIwMTksMTcuOTk4MDcwNCAzNC45MzcyMDE5LDEzLjUxNzM3MSBaIE02OS43Njc4MTI2LDEzLjI0OTQ1MyBDNzAuMDY2ODk5MSwxNS4zOTY3MTc3IDcyLjQ2NzUzNjYsMTYuNjk2OTM2NSA3NC4zMDExMjQsMTYuNjk2OTM2NSBDNzUuOTczMzU5MiwxNi42OTY5MzY1IDc3LjAyODg4MDQsMTYuMzgzMzY5OCA3OC4xMjg1NDcyLDE1LjU5NzU5MyBDNzkuMDQzNDY0NywxNC45NDM3NjM3IDgwLjI3MDkzMzEsMTQuOTE4ODE4NCA4MS4xOTYwMDQsMTUuNTU4NjQzMyBDODIuNzE3NDgyLDE2LjYxMDk0MDkgODIuNzAwMjY1MywxOC44NTcxMTE2IDgxLjE1MzE4MjgsMTkuODcyMjEwMSBDNzkuNDU5MDk1NSwyMC45ODQwMjYzIDc2Ljk5Njg3NDksMjIgNzMuNjU0ODMyNCwyMiBDNjcuODkxNDA0LDIyIDYzLjIwNTEyODIsMTcuMDY0NzcwMiA2My4yMDUxMjgyLDEwLjk5NzU5MyBDNjMuMjA1MTI4Miw0LjkzMjgyMjc2IDY3Ljg5MTQwNCw4Ljg4MTc4NDJlLTE2IDczLjY1NDgzMjQsOC44ODE3ODQyZS0xNiBDNzguODE3NDM5Myw4Ljg4MTc4NDJlLTE2IDgzLjI2NDQ0Niw0LjA1MDEwOTQxIDgzLjk5NzA0MjIsOS40MjIxMDA2NiBDODQuMDA0MTA1NSw5LjQ3NjgwNTI1IDg0LjAxMTE2ODgsOS41NTI1MTY0MSA4NC4wMTgyMzIsOS42NDA0ODE0IEM4NC4wODA2OTgxLDEwLjU5Mjc3OSA4My43NDY1MTU5LDExLjUwMjYyNTggODMuMDc4MzcyMywxMi4xOTc1OTMgQzgyLjQwODI0MjEsMTIuODk0MzEwNyA4MS40NTIyNjkyLDEzLjI0OTQ1MyA4MC40ODA4NDU0LDEzLjI0OTQ1MyBMNjkuNzY3ODEyNiwxMy4yNDk0NTMgWiBNNzcuNTk2ODEzNSw5LjE1NjQ1NTE0IEM3Ny41OTY4MTM1LDguMzA0NTk1MTkgNzYuOTc5NDM3NCw1LjE0ODc5NjUgNzMuNTU2NjA4NSw1LjE0ODc5NjUgQzcxLjU0Mzc5LDUuMTQ4Nzk2NSA2OS43NjI5NTY2LDcuMDM3NDE3OTQgNjkuNzYyOTU2Niw5LjE1NjQ1NTE0IEw3Ny41OTY4MTM1LDkuMTU2NDU1MTQgWiBNMzEuODg5MDk3NSw4Ljg4MTc4NDJlLTE2IEMzNC40NzUzMjEsOC44ODE3ODQyZS0xNiAzNi43Mjg1NjU3LDAuNjgwNTE4Mzk1IDM4LjU4NjI2LDIuMDIyOTU1ODEgQzQxLjcwMTgwMDMsNC4yNzM2OTkyOSA0MS42NTUzNjksNy43ODkyMDA0MyA0MS42Mzc5MDIsOS4xMTI2MDA4MyBDNDEuNjM2Nzk2NSw5LjE5NDY1NjkxIDQxLjYzNTY5MSw5LjI2ODE3OTE1IDQxLjYzNTY5MSw5LjMzMTQxNzAzIEw0MS42MzU2OTEsMTguNTc2NDAxNyBDNDEuNjM1NjkxLDIwLjM2NzE5MzUgNDAuMTYzNTk3NiwyMS44MjQwNzE4IDM4LjM1NDEwMzUsMjEuODI0MDcxOCBMMzguMjM0NzA4NywyMS44MjQwNzE4IEMzNy4zNTg3MDQ4LDIxLjgyNDA3MTggMzYuNTM0ODgwOSwyMS40ODYyMTk2IDM1LjkxNDY5MTMsMjAuODcyNDQwMSBDMzUuNTgxNzEyNiwyMC41NDMxMjE3IDM1LjMyODc3MjUsMjAuMTUyNTM0OCAzNS4xNjYyNjMsMTkuNzI2MDYyIEMzNC4yMzU0MjU5LDIwLjYwNzY3MjUgMzIuMzU3NjExNCwyMiAyOS4wODI2NTY5LDIyIEMyNC41MTUzNjQ1LDIyIDIxLjU2NDEwMjYsMTkuMjQyMDQwNiAyMS41NjQxMDI2LDE0Ljk3NDI0OTMgQzIxLjU2NDEwMjYsMTEuNDA0NDgxOCAyNC40OTcyMzQyLDguODI0NjM4NyAyOS4wMzY0NDY3LDguNDAxNjY2OTggQzMxLjYzMTUxNDMsOC4xNjA1MzE1MiAzMy44NzkwMTA0LDguNjU1OTMxNDEgMzQuOTUzMzQyMyw4Ljk1OTQyOTQ5IEwzNC45NTMxMjEyLDguNzEwODU0MjggQzM0Ljk1MzEyMTIsNC45MjU5OTAzOSAzMC40Mzg4OTMxLDUuMzYyMDkxMDkgMjcuMDM3Njg5Nyw2LjE0MDQyMDMzIEMyMy4wODI2MjcyLDcuMDQ4NzI2MzkgMjEuODk2MTk2OSwyLjAyNjQ1Njg3IDI1LjI4OTg4MjksMC45Nzc4ODk2MTcgQzI2Ljc2MzA4MTcsMC41MjI3NTE5MTIgMjguODQ0NzUxOCw4Ljg4MTc4NDJlLTE2IDMxLjg4OTA5NzUsOC44ODE3ODQyZS0xNiBaIE0zLjM4Mzc2NjEyLDguODgxNzg0MmUtMTYgTDkuNjgwMTgwOTMsOC44ODE3ODQyZS0xNiBDMTUuNzIzMDM4Myw4Ljg4MTc4NDJlLTE2IDIwLjcxOTk0MjksNC42ODg0ODIwNSAyMC44MTg5MzYsMTAuNDUxODU3OCBDMjAuODY4NDMyNiwxMy4zMjc3NjU1IDE5Ljc1MTE1OTgsMTYuMDQwMDgzNCAxNy42NzMyMDM1LDE4LjA4ODg4MTQgQzE1LjU5NDM0NzIsMjAuMTM4MTE1NiAxMi44MTY5MTQxLDIxLjI2NjY2NjcgOS44NTI1MTkwMiwyMS4yNjY2NjY3IEwzLjM4Mzc2NjEyLDIxLjI2NjY2NjcgQzEuNTE3OTcwMDgsMjEuMjY2NjY2NyAwLDE5Ljc5NTIzMTUgMCwxNy45ODYxNDcgTDAsMy4yODA1MTk2NiBDMCwxLjQ3MTQzNTIxIDEuNTE3OTcwMDgsOC44ODE3ODQyZS0xNiAzLjM4Mzc2NjEyLDguODgxNzg0MmUtMTYgWiBNNi41OTIwNDQzNywxNi4zMDMzNTM4IEw4LjM4NDQ5NTQ4LDE2LjMwMzM1MzggQzEyLjIxMDEzMTEsMTYuMzAzMzUzOCAxNC4yMjg2OTE1LDEzLjc2NDY1OTEgMTQuMjI4NjkxNSwxMC42MzMzMzMzIEMxNC4yMjg2OTE1LDcuNTAxNzg5NCAxMi4yNDc0Nzg1LDQuOTYzNTMwOTQgOC4zODQ0OTU0OCw0Ljk2MzUzMDk0IEw2LjU5MjA0NDM3LDQuOTYzNTMwOTQgTDYuNTkyMDQ0MzcsMTYuMzAzMzUzOCBaIE01Mi43OTQ5MjYsMTMuMjUyNjAzNCBMNTYuNzk1NjkxMiwyLjE3ODc1Mjk1IEM1Ny4yNjgxMjA5LDAuODcxMzI2MTI2IDU4LjUwOTYxNjksOC44ODE3ODQyZS0xNiA1OS45MDA0MTY0LDguODgxNzg0MmUtMTYgQzYyLjMwODc1NjcsOC44ODE3ODQyZS0xNiA2My45MDYyMTY4LDIuNDk0NzIzNTUgNjIuODk4MDg5Nyw0LjY4MDkxNjI0IEw1NS43OTQ1Njk1LDIwLjA4MDc2MzEgQzU1LjI1NDkzMTQsMjEuMjUwNTU0NSA1NC4wODM3MDg3LDIyIDUyLjc5NDkyNiwyMiBDNTEuNTA1OTI0MywyMiA1MC4zMzQ3MDE2LDIxLjI1MDU1NDUgNDkuNzk1MDYzNSwyMC4wODA3NjMxIEw0Mi42OTE3NjIzLDQuNjgwOTE2MjQgQzQxLjY4MzQxNjIsMi40OTQ3MjM1NSA0My4yODA4NzYzLDguODgxNzg0MmUtMTYgNDUuNjg5NDM1NSw4Ljg4MTc4NDJlLTE2IEM0Ny4wODAwMTYxLDguODgxNzg0MmUtMTYgNDguMzIxNTEyMiwwLjg3MTMyNjEyNiA0OC43OTM5NDE4LDIuMTc4NzUyOTUgTDUyLjc5NDkyNiwxMy4yNTI2MDM0IFogTTg3LDIuMTk5OTk5OTcgQzg3LDIuODE3OTc3NDggODYuNzg2OTQ5MSwzLjMzNzA3ODYxIDg2LjM1NDU4MDcsMy43NjM0ODMwOSBDODUuOTIyMjEyNyw0LjE4OTg4NzU4IDg1LjM4OTU4NTEsNC4zOTk5OTk5NCA4NC43NjkyMzA4LDQuMzk5OTk5OTQgQzg0LjE0MjYxMDMsNC4zOTk5OTk5NCA4My42MTYyNDg4LDQuMTg5ODg3NTggODMuMTgzODgwOCwzLjc2MzQ4MzA5IEM4Mi43NTE1MTI1LDMuMzM3MDc4NjEgODIuNTM4NDYxNSwyLjgxNzk3NzQ4IDgyLjUzODQ2MTUsMi4xOTk5OTk5NyBDODIuNTM4NDYxNSwxLjU4MjAyMjQ1IDgyLjc1MTUxMjUsMS4wNjI5MjEzMyA4My4xODM4ODA4LDAuNjM2NTE2ODQ1IEM4My42MTYyNDg4LDAuMjEwMTEyMzU2IDg0LjE0MjYxMDMsLTUuMzI5MDcwNTJlLTE1IDg0Ljc2OTIzMDgsLTUuMzI5MDcwNTJlLTE1IEM4NS4zODk1ODUxLC01LjMyOTA3MDUyZS0xNSA4NS45MjIyMTI3LDAuMjEwMTEyMzU2IDg2LjM1NDU4MDcsMC42MzY1MTY4NDUgQzg2Ljc4Njk0OTEsMS4wNjI5MjEzMyA4NywxLjU4MjAyMjQ1IDg3LDIuMTk5OTk5OTcgWiBNODYuNzA1NDg4MywyLjE5OTk5OTk3IEM4Ni43MDU0ODgzLDEuNjc0NzE5MDggODYuNTE3NTAyLDEuMjIzNTk1NDkgODYuMTM1MjYzNiwwLjg1MjgwODk3NSBDODUuNzU5MjkxMSwwLjQ3NTg0MjY4OCA4NS4zMDE4NTgxLDAuMjkwNDQ5NDM0IDg0Ljc2OTIzMDgsMC4yOTA0NDk0MzQgQzg0LjIzNjYwMzEsMC4yOTA0NDk0MzQgODMuNzc5MTcwMSwwLjQ3NTg0MjY4OCA4My40MDMxOTc5LDAuODUyODA4OTc1IEM4My4wMjA5NTkyLDEuMjIzNTk1NDkgODIuODMyOTczMywxLjY3NDcxOTA4IDgyLjgzMjk3MzMsMi4xOTk5OTk5NyBDODIuODMyOTczMywyLjcyNTI4MDg1IDgzLjAyMDk1OTIsMy4xNzY0MDQ0NiA4My40MDMxOTc5LDMuNTQ3MTkwOTcgQzgzLjc3OTE3MDEsMy45MjQxNTcyNSA4NC4yMzY2MDMxLDQuMTA5NTUwNSA4NC43NjkyMzA4LDQuMTA5NTUwNSBDODUuMzAxODU4MSw0LjEwOTU1MDUgODUuNzU5MjkxMSwzLjkyNDE1NzI1IDg2LjE0MTUyOTgsMy41NDcxOTA5NyBDODYuNTE3NTAyLDMuMTc2NDA0NDYgODYuNzA1NDg4MywyLjcyNTI4MDg1IDg2LjcwNTQ4ODMsMi4xOTk5OTk5NyBaIE04NS4wODI1NDEsMi4zNzMwMzM2NyBMODUuNzc4MDg5OSwzLjQ3MzAzMzY2IEw4NS4yOTU1OTE5LDMuNDczMDMzNjYgTDg0LjY3NTIzNzYsMi40MTYyOTIxIEw4NC4zNTU2NjEyLDIuNDE2MjkyMSBMODQuMzU1NjYxMiwzLjQ3MzAzMzY2IEw4My45NTQ2MjQsMy40NzMwMzM2NiBMODMuOTU0NjI0LDAuOTI2OTY2Mjc3IEw4NC44NDQ0MjUxLDAuOTMzMTQ2MDUxIEM4NS4wNzAwMDg3LDAuOTMzMTQ2MDUxIDg1LjI1Nzk5NDksMS4wMDExMjM1OCA4NS40MTQ2NSwxLjEzMDg5ODg2IEM4NS41NzEzMDUyLDEuMjYwNjc0MTQgODUuNjUyNzY1NiwxLjQzOTg4NzYyIDg1LjY1Mjc2NTYsMS42Njg1MzkzIEM4NS42NTI3NjU2LDEuODg0ODMxNDMgODUuNTk2MzY5OCwyLjA0NTUwNTU4IDg1LjQ3NzMxMiwyLjE1Njc0MTU0IEM4NS4zNjQ1MjA0LDIuMjY3OTc3NDkgODUuMjMyOTI5OSwyLjM0MjEzNDc5IDg1LjA4MjU0MSwyLjM3MzAzMzY3IFogTTg1LjIzOTE5NjEsMS42NzQ3MTkwOCBDODUuMjM5MTk2MSwxLjM5NjYyOTE5IDg1LjA1NzQ3NjMsMS4yNjA2NzQxNCA4NC43MDAzMDI2LDEuMjYwNjc0MTQgTDg0LjM1NTY2MTIsMS4yNjA2NzQxNCBMODQuMzU1NjYxMiwyLjA4ODc2NDAxIEw4NC43MDAzMDI2LDIuMDg4NzY0MDEgQzg1LjA1NzQ3NjMsMi4wODg3NjQwMSA4NS4yMzkxOTYxLDEuOTUyODA4OTYgODUuMjM5MTk2MSwxLjY3NDcxOTA4IFoiIGlkPSJjb2xvciIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4= -->
        </table>
        <p style="text-align: end; width: 19rem">
          Total: {{ calculations.toLocaleString('en-US') }}
        </p>
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import { DateTime } from 'luxon'
export default {
  props: {
    reciept: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    data: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    total: {
      type: Number,
      require: false,
      default: () => 0,
    },
    goods: {
      type: Array,
      require: false,
      default: () => [],
    },
  },
  data() {
    return {
      dataObject: {
        amount: '',
      },
      calculations: 0,
      totalInvoice: 0,
      payAmount: 0,
      balance: 0,
      paymentMethod: [],
      deposit: [
        {
          payment_method: null,
          amount: '',
        },
      ],
    }
  },
  computed: {
    formattedQty() {
      // Add the commas back to the string
      const qty = this.dataObject.amount + ''
      console.log(qty)
      return qty.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    transactionDate(){
      if(this.reciept.created_at){
        return DateTime.fromISO(this.reciept.created_at).toFormat('yyyy-LL-dd T')
      }
    }
  },
  async mounted() {
    const data = await this.$api.finance_settings.getPaymentMethods({
      size: 1000,
    })
    this.paymentMethod = data.results
    console.log(this.reciept)
  },
  watch: {
    'reciept.bill_lines'() {
      let calc = 0
      this.reciept.bill_lines.map((el) => {
        let text = el.selling_price.toString()
        let num = parseFloat(text)
        calc += num
      })
      this.totalInvoice = calc
    },
    'reciept.payment_lines'() {
      let calc = 0
      this.reciept.payment_lines.map((el) => {
        let text = el.total_amount.toString()
        let num = parseFloat(text)
        calc += num
      })
      this.calculations = calc
    },
  },
  methods: {
    ok() {
      var mywindow = window.open('', 'PRINT', 'height=400,width=600')
      let text = document.getElementById('text').innerHTML
      mywindow.document.write('</head><body >')
      mywindow.document.write(text)
      mywindow.document.write('</body></html>')

      mywindow.focus() // necessary for IE >= 10*/
      // mywindow.onload = function() { mywindow.print()};
      mywindow.print()
      mywindow.close()

      return true
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },
    handleQtyInput(newValue, index) {
      if (newValue != '') {
        this.deposit[index].amount = this.numberWithCommas(
          parseFloat(newValue.replace(/,/g, ''))
        )
      } else {
        this.deposit[index].amount = ''
      }
    },
    addPaymentMethod() {
      this.deposit.push({
        payment_method: null,
        amount: '',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.color {
  color: aqua;
}
.b-table-sticky-header,
.table-responsive,
[class*='table-responsive-'] {
  margin-bottom: 0rem;
}
</style>