# Shepherd Ember.js Client Application

Shepherd Ember.js Client is a client application for the [Shepherd Document Asset Management (DAM) server API](https://github.com/aboma/shepherd-rest-api) for storing and serving media files with associated metadata. It uses [ember.js](http://emberjs.com/) to provide a superior user experience using a one-page web application.

## Why Another Digital Asset Management System?

Shepherd allows you to have one canonical version of a file that can be shown through many containers (portfolios). Most other systems require you to save a copy of the file in each container, which leads to unnecessary storage and divergence of metadata.

Shepherd also separates the client frontend application from the backend RESTful server, allowing you the flexibility to build your own client app using your preferred technology or merely interface the API with other systems without using a frontend.

This client application has also been designed for superior responsiveness and usability achieved through the use of a one page javascript app.

![Shepherd DAM Client](ShepherdDAMClient.png "Shepherd DAM Client")

## Functionality
### Metadata Fields and Templates

Metadata fields can be defined through the admin pages. These fields must have a type and may also have a metadata list assigned to them, if desired. The metadata list setting will require the user setting value on the field to pick a value from the metadata list.

Metadata templates can be created with one or more fields assigned to them. These templates can then be assigned to portfolios, so that any assets added to that portfolio must satisfy the metadata template settings.

### Portfolios

Portfolios can be created to contain groups of related assets (files). A metadata template may be assigned to the portfolio to enforce required metadata entry on assets added to the portfolio. 

### Assets (files)

Assets may be uploaded into a portfolio, however, assets can belong to more than one portfolio. In this way, one version of a file/asset can live in multiple portfolios without having to store multiple copies of the same file as you would in a file system. Shepherd allows you to store one canonical version of your files/assets and associated metadata. 


## Releases

Please see the Changelog for complete release information.

## Roadmap

* Search
* Video and document support
* User Permissions
* Results Paging

## Installation

### Environment

It is recommended that you install this application on Linux. It has been tested on Ubuntu Linux.

### Pre-requisites

Ruby, Bundler gem, ImageMagick dev package

### Process

* Install [Shepherd REST API server](https://github.com/aboma/shepherd-rest-api) to provide server-side RESTful API.
* Checkout lastest release using git tags: clone the repository and then checkout the release tag that you have selected:

```
$ git clone git@github.com:aboma/shepherd-emberjs-client.git 
$ git checkout tags/<tag_name>
```
* Make sure you checkout matching versions of the API and client applications.
* Set protocol, host, port and path settings to Shepherd REST API server in `config/setting.yml` or `config/settings/<environment>.yml` files. If these settings are not there or incorrect, upon login a message will state that the system is unable to contact API.

## Contributing

Contributions welcome and appreciated.
