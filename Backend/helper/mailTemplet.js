exports.mailTemplet = ({fullName}) => {
    return (`
     <body
    style='background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'>
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
      The sales intelligence platform that helps you uncover qualified leads.
      <div>
        <h1
style="display:block;outline:none;border:none;text-decoration:none;font-size:30px;text-align:center;color:#484848">
wealthWise Women
</h1>
      </div>
    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
      <tbody>
        <tr style="width:100%">
          <td>
           <h1
style="display:block;outline:none;border:none;text-decoration:none;font-size:30px;text-align:center;color:#484848">
WelthWise Women
</h1>
            <p
              style="font-size:16px;line-height:26px;margin-bottom:16px;margin-top:16px">
              Hi 
              <!-- -->${fullName}<!-- -->,
            </p>
            <p
              style="font-size:16px;line-height:26px;margin-bottom:16px;margin-top:16px">
              Welcome to WealthWise Women, the financial intelligence platform that helps you
learn how to save money and increase your wealth.
            </p>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="text-align:center">
              <tbody>
                <tr>
                  <td>
                    <a
                      href="http://localhost:5173/login"
                      style="line-height:100%;text-decoration:none;display:block;max-width:100%;mso-padding-alt:0px;background-color:#5F51E8;border-radius:3px;color:#fff;font-size:16px;text-align:center;padding:12px 12px 12px 12px"
                      target="_blank"
                      ><span
                        ><!--[if mso]><i style="mso-font-width:300%;mso-text-raise:18" hidden>&#8202;&#8202;</i><![endif]--></span
                      ><span
                        style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px"
                        >Get started</span
                      ><span
                        ><!--[if mso]><i style="mso-font-width:300%" hidden>&#8202;&#8202;&#8203;</i><![endif]--></span
                      ></a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style="font-size:16px;line-height:26px;margin-bottom:16px;margin-top:16px">
              Best,<br />The welthWise Woman team
            </p>
            <hr
              style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
            <p
              style="font-size:12px;line-height:24px;margin-bottom:16px;margin-top:16px;color:#8898aa">
              470 Noor Ave STE B #1148, South San Francisco, CA 94080
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>`);
}




