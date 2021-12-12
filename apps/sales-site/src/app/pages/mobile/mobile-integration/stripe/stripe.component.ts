import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'valor-launchpad-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent {

  supports = [
    {
      title: "Features",
      list: ["Data destination", "Data source", "Supports client-side plugin"
      ]
    }, {
      title: "Supported Data",
      list: ["Users", "Events", "Audiences"]
    }, {
      title: "Supported Platforms",
      list: ["Web", "Mobile", "Server", "Personas"]
    }, {
      title: "Security Certifications",
      list: ["ISO", "SOC2"]
    }, {
      title: "Supported Platforms",
      list: ["Web", "Mobile", "Server", "Personas"]
    }];
}
