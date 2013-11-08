# Shepherd Ember.js Client Application

Shepherd Ember.js Client is a client application for the [Shepherd Document Asset Management (DAM) server API](https://github.com/aboma/shepherd-rest-api) for storing and serving media files with associated metadata. It uses [ember.js](http://emberjs.com/) to provide a superior user experience using a one-page web application. 

## Releases

Please see the Changelog for complete release information.

## Roadmap

* Search
* Video and document support
* User Permissions

## Installation

### Environment

It is recommended that you install this application on Linux. It has been tested on Ubuntu Linux.

### Pre-requisites

Ruby, Bundler gem

### Process

* Install Shepherd REST API server
* Checkout lastest release using git tags: clone the repository and then checkout the release tag that you have selected:
```
git clone git@github.com:aboma/shepherd-emberjs-client.git 
git checkout tags/<tag_name>
```
* Set protocol, host, port and path settings to Shepherd REST API server in `config/setting.yml` or `config/settings/<environment>.yml` files. If this setting is not there or incorrect, upon login a message will state that the system is unable to contact API.

## Contributing

Contributions welcome and appreciated.
