import { Component } from '@angular/core';

@Component({
  selector: 'valor-launchpad-tables-bootstrap',
  templateUrl: './tables-bootstrap.component.html',
  styleUrls: ['./tables-bootstrap.component.scss'],
})
export class TablesBootstrapComponent {
  basicTableData = [
    {
      name: 'Ashley Briggs',
      phoneNumber: '864-348-0485',
      birthDate: '1961-06-21T00:00:00+08:00',
    },
    {
      name: 'Carl Jenkins',
      phoneNumber: '914-939-2458',
      birthDate: '1948-05-15T00:00:00+09:00',
    },
    {
      name: 'Bertha Martin',
      phoneNumber: '704-993-5435',
      birthDate: '1965-09-14T00:00:00+08:00',
    },
    {
      name: 'Stacie Hall',
      phoneNumber: '765-382-8195',
      birthDate: '1971-04-02T00:00:00+08:00',
    },
    {
      name: 'Amanda Jones',
      phoneNumber: '202-672-1407',
      birthDate: '1966-10-12T00:00:00+08:00',
    },
  ];

  stripTableData = [
    {
      name: 'Ashley Briggs',
      phoneNumber: '864-348-0485',
      birthDate: '1961-06-21T00:00:00+08:00',
    },
    {
      name: 'Carl Jenkins',
      phoneNumber: '914-939-2458',
      birthDate: '1948-05-15T00:00:00+09:00',
    },
    {
      name: 'Bertha Martin',
      phoneNumber: '704-993-5435',
      birthDate: '1965-09-14T00:00:00+08:00',
    },
    {
      name: 'Stacie Hall',
      phoneNumber: '765-382-8195',
      birthDate: '1971-04-02T00:00:00+08:00',
    },
    {
      name: 'Amanda Jones',
      phoneNumber: '202-672-1407',
      birthDate: '1966-10-12T00:00:00+08:00',
    },
  ];

  condensedTableData = [
    {
      operationSystem: 'Windows',
      users: '8.232',
      share: '40%',
    },
    {
      operationSystem: 'Mac OS',
      users: '3.322',
      share: '20%',
    },
    {
      operationSystem: 'Linux',
      users: '4.232',
      share: '34%',
    },
    {
      operationSystem: 'FreeBSD',
      users: '1.121',
      share: '12%',
    },
    {
      operationSystem: 'Chrome OS',
      users: '1.331',
      share: '15%',
    },
    {
      operationSystem: 'Android',
      users: '2.301',
      share: '20%',
    },
    {
      operationSystem: 'iOS',
      users: '1.162',
      share: '14%',
    },
    {
      operationSystem: 'Windows Phone',
      users: '562',
      share: '7%',
    },
    {
      operationSystem: 'Other',
      users: '1.181',
      share: '14%',
    },
  ];

  hoverTableData = [
    {
      name: 'Ashley Briggs',
      phoneNumber: '864-348-0485',
      birthDate: '1961-06-21T00:00:00+08:00',
      avatar: 'assets/img//avatars/avatar-5.jpg',
    },
    {
      name: 'Carl Jenkins',
      phoneNumber: '914-939-2458',
      birthDate: '1948-05-15T00:00:00+09:00',
      avatar: 'assets/img//avatars/avatar-2.jpg',
    },
    {
      name: 'Bertha Martin',
      phoneNumber: '704-993-5435',
      birthDate: '1965-09-14T00:00:00+08:00',
      avatar: 'assets/img//avatars/avatar-3.jpg',
    },
    {
      name: 'Stacie Hall',
      phoneNumber: '765-382-8195',
      birthDate: '1971-04-02T00:00:00+08:00',
      avatar: 'assets/img//avatars/avatar-4.jpg',
    },
  ];

  borderedTableData = [
    {
      name: 'Ashley Briggs',
      phoneNumber: '864-348-0485',
      birthDate: '1961-06-21T00:00:00+08:00',
    },
    {
      name: 'Carl Jenkins',
      phoneNumber: '914-939-2458',
      birthDate: '1948-05-15T00:00:00+09:00',
    },
    {
      name: 'Bertha Martin',
      phoneNumber: '704-993-5435',
      birthDate: '1965-09-14T00:00:00+08:00',
    },
    {
      name: 'Stacie Hall',
      phoneNumber: '765-382-8195',
      birthDate: '1971-04-02T00:00:00+08:00',
    },
    {
      name: 'Amanda Jones',
      phoneNumber: '202-672-1407',
      birthDate: '1966-10-12T00:00:00+08:00',
    },
  ];

  contextualTableData = [
    {
      name: 'Ashley Briggs',
      phoneNumber: '864-348-0485',
      birthDate: '1961-06-21T00:00:00+08:00',
    },
    {
      name: 'Carl Jenkins',
      phoneNumber: '914-939-2458',
      birthDate: '1948-05-15T00:00:00+09:00',
      trClass: 'table-primary',
    },
    {
      name: 'Bertha Martin',
      phoneNumber: '704-993-5435',
      birthDate: '1965-09-14T00:00:00+08:00',
    },
    {
      name: 'Stacie Hall',
      phoneNumber: '765-382-8195',
      birthDate: '1971-04-02T00:00:00+08:00',
      trClass: 'table-success',
    },
    {
      name: 'Amanda Jones',
      phoneNumber: '202-672-1407',
      birthDate: '1966-10-12T00:00:00+08:00',
    },
  ];
}
