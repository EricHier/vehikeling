<template>
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <title>{{subject}}</title>
  </head>
  <body style="
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    line-height: 1.6; ">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <!-- Header -->
    <tr>
      <td style="padding: 0rem;">
        <section style="
          background-image: linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);
          background-color: #00d1b2;
          color: #fff;
          align-items: stretch;
          display: flex;
          flex-direction: column;
          justify-content: space-between;">
          <div style="flex-grow: 1; flex-shrink: 0;  padding: 3rem 1.5rem;">
            <div style="
              max-width: 800px;
              flex-grow: 1;
              margin: 0 auto;
              position: relative;
              width: auto;">
              <h1 style="
              color: #fff;
              font-size: 2rem;
              font-weight: 600;
              line-height: 1.125;
              word-break: break-word;
              margin-bottom: 1rem;">
                vehikeling
              </h1>
              <h2 style="
                color: #fff;
                font-size: 1.25rem;
                word-break: break-word;
                font-weight: 400;
                line-height: 1.25;">
                Die Vehikel-Servecing App für deine Fahrzeuge.
              </h2></div>
          </div>
        </section>
      </td>
    </tr>

    <!-- Content -->
    <tr style="background-color: #ffffff; ">
      <td style="padding: 2rem; ">
        <div style="max-width: 800px; margin: auto; font-size: 16px; ">
          {{htmlContent}}
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #fafafa; padding: 3rem 1.5rem 6rem;">
        <div style="text-align: center !important;">
          <p style="margin-bottom: 1em;">
            <strong>vehikeling</strong> by <a href="https://github.com/erichier" title="EricHier auf Github" style="color: #363636; text-decoration: none; ">EricHier</a>.
          </p>
          <p>
            <a href="https://vehikeling.de" title="Webseite" style="color: #3273dc; cursor: pointer; text-decoration: none;">Webseite</a> -
            <a href="https://vehikeling.de/kontakt" title="Kontakt">Konakt</a> -
            <a href="https://github.com/erichier/vehikeling" title="vehikeling auf GitHub">Projekt auf GitHub</a>
          </p>
        </div>
      </td>
    </tr>
  </table>
  </body>
  </html>

</template>
<script>
  export default {
    layout: "none"
  }
</script>
