import { Component } from '@angular/core';

@Component({
  selector: 'valor-launchpad-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss'],
})
export class InstallationComponent {
  basicTamplete = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>AppStack</title>

    <link href="{PATH}/dist/css/light.css" rel="stylesheet">
  </head>
  <body data-theme="default" data-layout="fluid" data-sidebar-position="left" data-sidebar-behavior="sticky">
    <h1>Hello, world!</h1>

    <script src="{PATH}/dist/js/app.js"></script>
  </body>
  </html>`;

  dropJquery = `new Webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    jquery: "jquery",
    "window.$": "jquery",
    "window.jQuery": "jquery"
  })`;

  dropJquery2 = `{
    test: require.resolve("jquery"),
    use: [
      {
        loader: "expose-loader",
        options: "jQuery"
      },
      {
        loader: "expose-loader",
        options: "$"
      }
    ]
  }`;
}
