const forgotRouter = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const { CommentsController } = require('moongose/controller');

// recebendo o email do usuario q esqueceu a senha
forgotRouter.post('/forgot', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        
      var token = crypto.randomBytes(20).toString('hex');

      await User.updateOne({ _id: user._id }, { $set: { resetPasswordToken: token } });
      

      const sgMail = require('@sendgrid/mail')
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)

      const msg = {
        to: 'joaoperaro2@gmail.com', // Change to your recipient
        from: 'joaoperaro1@gmail.com', // Change to your verified sender
        subject: 'Resetar a senha',
        text: 'Resetar a senha',
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
              <!--[if !mso]><!-->
              <meta http-equiv="X-UA-Compatible" content="IE=Edge">
              <!--<![endif]-->
              <!--[if (gte mso 9)|(IE)]>
              <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG/>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
              </xml>
              <![endif]-->
              <!--[if (gte mso 9)|(IE)]>
          <style type="text/css">
            body {width: 600px;margin: 0 auto;}
            table {border-collapse: collapse;}
            table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
            img {-ms-interpolation-mode: bicubic;}
          </style>
        <![endif]-->
              <style type="text/css">
            body, p, div {
              font-family: inherit;
              font-size: 14px;
            }
            body {
              color: #000000;
            }
            body a {
              color: #1188E6;
              text-decoration: none;
            }
            p { margin: 0; padding: 0; }
            table.wrapper {
              width:100% !important;
              table-layout: fixed;
              -webkit-font-smoothing: antialiased;
              -webkit-text-size-adjust: 100%;
              -moz-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }
            img.max-width {
              max-width: 100% !important;
            }
            .column.of-2 {
              width: 50%;
            }
            .column.of-3 {
              width: 33.333%;
            }
            .column.of-4 {
              width: 25%;
            }
            ul ul ul ul  {
              list-style-type: disc !important;
            }
            ol ol {
              list-style-type: lower-roman !important;
            }
            ol ol ol {
              list-style-type: lower-latin !important;
            }
            ol ol ol ol {
              list-style-type: decimal !important;
            }
            @media screen and (max-width:480px) {
              .preheader .rightColumnContent,
              .footer .rightColumnContent {
                text-align: left !important;
              }
              .preheader .rightColumnContent div,
              .preheader .rightColumnContent span,
              .footer .rightColumnContent div,
              .footer .rightColumnContent span {
                text-align: left !important;
              }
              .preheader .rightColumnContent,
              .preheader .leftColumnContent {
                font-size: 80% !important;
                padding: 5px 0;
              }
              table.wrapper-mobile {
                width: 100% !important;
                table-layout: fixed;
              }
              img.max-width {
                height: auto !important;
                max-width: 100% !important;
              }
              a.bulletproof-button {
                display: block !important;
                width: auto !important;
                font-size: 80%;
                padding-left: 0 !important;
                padding-right: 0 !important;
              }
              .columns {
                width: 100% !important;
              }
              .column {
                display: block !important;
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
              }
              .social-icon-column {
                display: inline-block !important;
              }
            }
          </style>
              <!--user entered Head Start--><link href="https://fonts.googleapis.com/css?family=Chivo&display=swap" rel="stylesheet"><style>
        body {font-family: 'Chivo', sans-serif;}
        </style><!--End Head user entered-->
            </head>
            <body>
              <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#FFFFFF;">
                <div class="webkit">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                    <tr>
                      <td valign="top" bgcolor="#FFFFFF" width="100%">
                        <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td width="100%">
                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td>
                                    <!--[if mso]>
            <center>
            <table><tr><td width="600">
          <![endif]-->
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                              <tr>
                                                <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
            <tr>
              <td role="module-content">
                <p></p>
              </td>
            </tr>
          </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:0px 0px 0px 0px;" bgcolor="#FFFFFF" data-distribution="1">
            <tbody>
              <tr role="module-content">
                <td height="100%" valign="top"><table width="600" style="width:600px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
              <tbody>
                <tr>
                  <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="00cedc83-bd19-445a-9c66-2bb531df0ee8">
            <tbody>
              <tr>
                <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                  <!--<img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/954c252fedab403f/defda58d-23f4-46cb-828f-77dee4a44953/600x24.png">-->
                </td>
              </tr>
            </tbody>
          </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="0439ab5b-e48d-4678-b644-de6e5a115565">
            <tbody>
              <tr>
                <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                  <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="7px" style="line-height:7px; font-size:7px;">
                    <tbody>
                      <tr>
                        <td style="padding:0px 0px 7px 0px;" bgcolor="#ffffff"></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table></td>
                </tr>
              </tbody>
            </table></td>
              </tr>
            </tbody>
          </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:30px 0px 30px 30px;" bgcolor="#243F9A" data-distribution="1">
            <tbody>
              <tr role="module-content">
                <td height="100%" valign="top"><table width="570" style="width:570px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
              <tbody>
                <tr>
                  <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="33d39ee4-da50-404a-8d62-ac83a12a2429">
            <tbody>
              <tr>
                <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="left">
                  <!--<img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" width="185" alt="" data-proportionally-constrained="true" data-responsive="false" src="http://cdn.mcauto-images-production.sendgrid.net/954c252fedab403f/83ddff42-07b1-4938-9245-a879fa80d3b3/185x16.png" height="16">-->
                </td>
              </tr>
            </tbody>
          </table></td>
                </tr>
              </tbody>
            </table></td>
              </tr>
            </tbody>
          </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:50px 0px 0px 30px;" bgcolor="#fff7ea" data-distribution="1">
            <tbody>
              <tr role="module-content">
                <td height="100%" valign="top"><table width="550" style="width:550px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
              <tbody>
                <tr>
                  <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="550f2fb7-70c1-463b-9758-84b6d731ca56">
            <tbody>
              <tr>
                <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="left">
                  <!--<img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" width="162" alt="" data-proportionally-constrained="true" data-responsive="false" src="http://cdn.mcauto-images-production.sendgrid.net/954c252fedab403f/27050768-0978-4ce8-8ad0-fa01a1949374/162x34.png" height="34">-->
                </td>
              </tr>
            </tbody>
          </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d8a6da06-629b-4b1f-a750-84744e679927">
            <tbody>
              <tr>
                <td style="padding:0px 0px 20px 0px;" role="module-content" bgcolor="">
                </td>
              </tr>
            </tbody>
          </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b16a4afb-f245-4156-968e-8080176990ea" data-mc-module-version="2019-10-22">
            <tbody>
              <tr>
                <td style="padding:18px 40px 0px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="color: #243F9A; font-size: 24px">Nós recebemos a informação de que você deseja resetar a sua senha.</span></div><div></div></div></td>
              </tr>
            </tbody>
          </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b16a4afb-f245-4156-968e-8080176990ea.1" data-mc-module-version="2019-10-22">
            <tbody>
              <tr>
                <td style="padding:18px 40px 10px 0px; line-height:18px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="color: #243F9A"><strong>Proteger seus dados é importante pra nós.</strong></span></div>
        <div style="font-family: inherit; text-align: inherit"><span style="color: #243F9A"><strong>Porfavor, clique no botão abaixo para começar.</strong></span></div><div></div></div></td>
              </tr>
            </tbody>
          </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c97177b8-c172-4c4b-b5bd-7604cde23e3f">
            <tbody>
              <tr>
                <td style="padding:0px 0px 10px 0px;" role="module-content" bgcolor="">
                </td>
              </tr>
            </tbody>
          </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="9c7ac938-a540-4353-9fec-543b193bf7da">
              <tbody>
                <tr>
                  <td align="left" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;">
                    <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                      <tbody>
                        <tr>
                        <td align="center" bgcolor="#fbca5b" class="inner-td" style="border-radius:6px; font-size:16px; text-align:left; background-color:inherit;">
                          <a href="http://localhost:3000/forgotPassword/resetpassword/${token}" style="background-color:#fbca5b; border:1px solid #fbca5b; border-color:#fbca5b; border-radius:0px; border-width:1px; color:#000000; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 50px 12px 50px; text-align:center; text-decoration:none; border-style:solid; font-family:inherit;" target="_blank">Resetar senha</a>
                        </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c97177b8-c172-4c4b-b5bd-7604cde23e3f.1">
            <tbody>
              <tr>
                <td style="padding:0px 0px 60px 0px;" role="module-content" bgcolor="">
                </td>
              </tr>
            </tbody>
          </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b16a4afb-f245-4156-968e-8080176990ea.1.1" data-mc-module-version="2019-10-22">
            <tbody>
              <tr>
                <td style="padding:18px 40px 10px 0px; line-height:18px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="color: #00634a">Se não foi você que solicitou a mudança de senha, entre em contato conosco.</span></div>
        <div style="font-family: inherit; text-align: inherit"><span style="color: #00634a">IMEDIATAMENTE para manter sua conta segura.</span></div>
        <div style="font-family: inherit; text-align: inherit"><span style="color: #00634a"><br>
        </span></div>
        <div style="font-family: inherit; text-align: inherit"><span style="color: #00634a">Entre em contato +55 980345690</span></div>
        <div style="font-family: inherit; text-align: inherit"><span style="color: #00634a">Ou email segurança - suppprt@sandown.com</span></div><div></div></div></td>
              </tr>
            </tbody>
          </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c97177b8-c172-4c4b-b5bd-7604cde23e3f.1.1">
            <tbody>
              <tr>
                <td style="padding:0px 0px 80px 0px;" role="module-content" bgcolor="">
                </td>
              </tr>
            </tbody>
          </table></td>
                </tr>
              </tbody>
            </table></td>
              </tr>
            </tbody>
            <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:30px 0px 30px 30px;" bgcolor="#243F9A" data-distribution="1">
            </table>
              <tbody>
                <tr>
                  <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 20px 0px;">
                    <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                      <tbody>
                        <tr>
                        <td align="center" bgcolor="#f5f8fd" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"><a href="https://sendgrid.com/" style="background-color:#f5f8fd; border:1px solid #f5f8fd; border-color:#f5f8fd; border-radius:25px; border-width:1px; color:#a8b9d5; display:inline-block; font-size:10px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:5px 18px 5px 18px; text-align:center; text-decoration:none; border-style:solid; font-family:helvetica,sans-serif;" target="_blank">♥ POWERED BY PERARO</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table></td>
                                              </tr>
                                            </table>
                                            <!--[if mso]>
                                          </td>
                                        </tr>
                                      </table>
                                    </center>
                                    <![endif]-->
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </center>
            </body>
          </html>`
      }

      sgMail.send(msg).then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })

        res.status(201).json({ message: 'Work' });
      
    }
});

// valida o token do usuario
forgotRouter.get('/resetPassword/:token', async (req, res) => {
    // mandando por parametro o token e verificando se existe
    const user = await User.findOne({ resetPasswordToken: req.params.token });
    if (!user) {
        return res.status(404).json({ message: 'Token invalido' });
    }
    res.status(200).json({ message: 'Token valido' });
});

forgotRouter.put('/resetPassword', async (req, res) => {
    // verfifica token
    const user = await User.findOne({ resetPasswordToken: req.body.token });
    if (!user) {
        return res.status(404).json({ message: 'Token invalido' });
    }
    // pegando a senha existente no banco e decriptando
    const decrypted = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
    const password = decrypted.toString(CryptoJS.enc.Utf8);

    // verifica se a senha atual é igual a senha nova
    if (password === req.body.newPassword) {
        return res.status(400).json({ message: 'Senha já existente' });
    }

    // criptografa a nova senha
    const passwordEncrypt = CryptoJS.AES.encrypt(req.body.newPassword, process.env.PASS_SECRET).toString()
    user.password = passwordEncrypt;
    
    // resetando o token
    if (user.resetPasswordToken === undefined) {
      res.status(400).json({ message: 'Token expirado' });
    }else {
      user.resetPasswordToken = undefined;
    }

    await user.save();
    res.status(200).json({ message: 'Senha alterada com sucesso' });   
});

module.exports = forgotRouter;