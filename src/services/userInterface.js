/*************************************************************************************
 * Product: ADempiere gRPC User Interface Client                                     *
 * Copyright (C) 2012-2022 E.R.P. Consultores y Asociados, C.A.                      *
 * Contributor(s): Edwin Betancourt EdwinBetanc0urt@outlook.com                      *
 * This program is free software: you can redistribute it and/or modify              *
 * it under the terms of the GNU General Public License as published by              *
 * the Free Software Foundation, either version 3 of the License, or                 *
 * (at your option) any later version.                                               *
 * This program is distributed in the hope that it will be useful,                   *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of                    *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                     *
 * GNU General Public License for more details.                                      *
 * You should have received a copy of the GNU General Public License                 *
 * along with this program. If not, see <https://www.gnu.org/licenses/>.             *
 ************************************************************************************/

const { createClientRequest } = require('@adempiere/grpc-api/lib/clientRequest');
const { isEmptyValue } = require('@adempiere/grpc-api/lib/convertValues.js');

class UserInterface {

  /**
   * File on generated stub
   */
  stubFile = require('@adempiere/grpc-api/src/grpc/proto/business_pb.js');

  /**
   * Constructor, No authentication required
   * @param {string} host
   * @param {string} version
   * @param {string} language
   */
  constructor(config) {
    if (config) {
      const adempiereConfig = config.adempiereApi.api;
      this.businessHost = adempiereConfig.businessHost;
      this.version = adempiereConfig.version;
      this.language = adempiereConfig.language;
      this.token = adempiereConfig.token;
    }

    this.initUserInterfaceService();
    console.log('ADempiere User Interface Client Started');
  }

  // Init connection
  initUserInterfaceService() {
    const grpc = require('@grpc/grpc-js');
    const services = require('@adempiere/grpc-api/src/grpc/proto/business_grpc_pb');
    this.userInterface = new services.UserInterfaceClient(this.businessHost, grpc.credentials.createInsecure());
  }

  // Get UserInterface Service
  getUserInterfaceService() {
    return this.userInterface;
  }

  // Tab Sequences (Is Sort Tab)
  listTabSequences({
    token,
    tabUuid,
    contextAttributes,
    pageSize,
    pageToken,
    language
  }, callback) {
    const { ListTabSequencesRequest } = this.stubFile;
    const request = new ListTabSequencesRequest();

    request.setTabUuid(tabUuid);

    if (!isEmptyValue(contextAttributes)) {
      const { convertParameterToGRPC, typeOfValue } = require('@adempiere/grpc-api/lib/convertValues.js');

      if (typeOfValue(contextAttributes) === 'String') {
        contextAttributes = JSON.parse(contextAttributes);
      }

      contextAttributes.forEach(attribute => {
        let parsedAttribute = attribute;
        if (typeOfValue(attribute) === 'String') {
          parsedAttribute = JSON.parse(attribute);
        }
        request.addContextAttributes(
          convertParameterToGRPC({
            columnName: parsedAttribute.key,
            value: parsedAttribute.value
          })
        );
      });
    }

    request.setPageSize(pageSize);
    request.setPageToken(pageToken);
    request.setClientRequest(
      createClientRequest({ token, language })
    );
  
    this.getUserInterfaceService().listTabSequences(request, callback)
  }

  // Tab Sequences (Is Sort Tab)
  saveTabSequences({
    token,
    tabUuid,
    contextAttributes,
    entitiesList,
    language
  }, callback) {
    const { SaveTabSequencesRequest } = this.stubFile;
    const request = new SaveTabSequencesRequest();

    request.setTabUuid(tabUuid);

    if (!isEmptyValue(contextAttributes)) {
      const { convertParameterToGRPC } = require('@adempiere/grpc-api/lib/convertValues.js');
      contextAttributes.forEach(attribute => {
        request.addContextAttributes(
          convertParameterToGRPC({
            columnName: attribute.key,
            value: attribute.value
          })
        );
      });
    }

    // entities records selections list
    if (!isEmptyValue(entitiesList)) {
      const { convertSelectionToGRPC } = require('@adempiere/grpc-api/lib/convertValues.js');

      entitiesList.forEach(entity => {
        // selection format = { selectionId: number, selectionValues: [{ columName, value }] }
        const convertedRecord = convertSelectionToGRPC({
          selectionId: entity.recordId,
          selectionUuid: entity.recordUuid,
          selectionValues: entity.attributesList
        });

        request.addEntities(convertedRecord);
      });
    }

    request.setClientRequest(
      createClientRequest({ token, language })
    );
  
    this.getUserInterfaceService().saveTabSequences(request, callback)
  }

  // Run a callout to server
  runCallout({
    token,
    language,
    tableName,
    windowUuid,
    tabUuid,
    callout,
    columnName,
    valueType,
    oldValue,
    value,
    windowNo,
    contextAttributes
  }, callback) {
    const { RunCalloutRequest } = this.stubFile;
    const { convertParameterToGRPC, convertValueToGRPC } = require('@adempiere/grpc-api/lib/convertValues.js');
    const request = new RunCalloutRequest();

    request.setWindowNo(windowNo);
    request.setTableName(tableName);
    request.setWindowUuid(windowUuid);
    request.setTabUuid(tabUuid);
    request.setCallout(callout);
    request.setColumnName(columnName);

    request.setOldValue(
      convertValueToGRPC({
        value: oldValue,
        valueType
      })
    );
    request.setValue(
      convertValueToGRPC({
        value,
        valueType
      })
    );

    if (!isEmptyValue(contextAttributes)) {
      const { typeOfValue } = require('@adempiere/grpc-api/lib/convertValues.js');
      contextAttributes.forEach(attribute => {
        let value = attribute.value
        let valueType = ''
        if (!isEmptyValue(attribute.value) && typeOfValue(attribute.value) === 'Object') {
          value = attribute.value.value
          if (!isEmptyValue(attribute.value.valueType)) {
            valueType = attribute.value.valueType
          }
        }

        // parameter format = { columName, value }
        const convertedParameter = convertParameterToGRPC({
          columnName: attribute.key,
          valueType,
          value
        });

        request.addContextAttributes(convertedParameter);
      });
    }

    request.setClientRequest(
      createClientRequest({ token, language })
    );

    this.getUserInterfaceService().runCallout(request, callback);
  }

}

module.exports = UserInterface;