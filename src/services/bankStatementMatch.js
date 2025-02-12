/*************************************************************************************
 * Product: ADempiere gRPC Bank Statement Match Client                               *
 * Copyright (C) 2012-2023 E.R.P. Consultores y Asociados, C.A.                      *
 * Contributor(s): Edwin Betancourt EdwinBetanc0urt@outlook.com                      *
 * This program is free software: you can redistribute it and/or modify              *
 * it under the terms of the GNU General Public License as published by              *
 * the Free Software Foundation, either version 3 of the License, or                 *
 * (at your option) any later version.                                               *
 * This program is distributed in the hope that it will be useful,                   *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of                    *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                      *
 * GNU General Public License for more details.                                      *
 * You should have received a copy of the GNU General Public License                 *
 * along with this program. If not, see <https://www.gnu.org/licenses/>.             *
 ************************************************************************************/

const { getMetadata } = require('@adempiere/grpc-api/src/utils/metadata.js');
const { getTimestamp, getValidInteger } = require('@adempiere/grpc-api/src/utils/valueUtils.js');

class BankStatementMatch {

  /**
   * File on generated stub
   */
  stubFile = require('@adempiere/grpc-api/src/grpc/proto/bank_statement_match_pb.js');

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

    this.initBankStatementMatchService();
    console.log('ADempiere Payment Allocation Client Started');
  }

  // Init connection
  initBankStatementMatchService() {
    const grpc = require('@grpc/grpc-js');
    const services = require('@adempiere/grpc-api/src/grpc/proto/bank_statement_match_grpc_pb.js');
    this.bankStatementMatch = new services.BankStatementMatchClient(
      this.businessHost,
      grpc.credentials.createInsecure()
    );
  }

  // Get Payment Allocation Service
  getBankStatementMatchService() {
    return this.bankStatementMatch;
  }


  /**
   * Get List Bank Accounts
   * @param {string} token
   * @param {string} searchValue
   * @param {number} pageSize
   * @param {string} pageToken
   */
  listBankAccounts({
    token,
    // DSL
    searchValue,
    // Page Data
    pageSize,
    pageToken
  }, callback) {
    const { ListBankAccountsRequest } = this.stubFile;
    const request = new ListBankAccountsRequest();

    request.setSearchValue(searchValue);
    request.setPageSize(
      getValidInteger(pageSize)
    );
    request.setPageToken(pageToken);

    const metadata = getMetadata({
      token
    });

    this.getBankStatementMatchService().listBankAccounts(
      request,
      metadata,
      callback
    );
  }


  /**
   * Get List Business Partners
   * @param {string} token
   * @param {string} searchValue
   * @param {number} pageSize
   * @param {string} pageToken
   */
  listBusinessPartners({
    token,
    // DSL
    searchValue,
    // Page Data
    pageSize,
    pageToken
  }, callback) {
    const { ListBusinessPartnersRequest } = this.stubFile;
    const request = new ListBusinessPartnersRequest();

    request.setSearchValue(searchValue);
    request.setPageSize(
      getValidInteger(pageSize)
    );
    request.setPageToken(pageToken);

    const metadata = getMetadata({
      token
    });

    this.getBankStatementMatchService().listBusinessPartners(
      request,
      metadata,
      callback
    );
  }


  /**
   * Get List Search Modes
   * @param {string} token
   * @param {string} searchValue
   * @param {number} pageSize
   * @param {string} pageToken
   */
  listSearchModes({
    token,
    // DSL
    searchValue,
    // Page Data
    pageSize,
    pageToken
  }, callback) {
    const { ListSearchModesRequest } = this.stubFile;
    const request = new ListSearchModesRequest();

    request.setSearchValue(searchValue);
    request.setPageSize(
      getValidInteger(pageSize)
    );
    request.setPageToken(pageToken);

    const metadata = getMetadata({
      token
    });

    this.getBankStatementMatchService().listSearchModes(
      request,
      metadata,
      callback
    );
  }


  /**
   * Get List Imported Bank Movements
   * @param {string} token
   * @param {string} searchValue
   * @param {number} pageSize
   * @param {string} pageToken
   */
  listImportedBankMovements({
    token,
    // DSL
    searchValue,
    bankAccountId,
    bankAccountUuid,
    businessPartnerId,
    businessPartnerUuid,
    paymentAmountFrom,
    paymentAmountTo,
    transactionDateFrom,
    transactionDateTo,
    matchMode,
    // Page Data
    pageSize,
    pageToken
  }, callback) {
    const { ListImportedBankMovementsRequest } = this.stubFile;
    const request = new ListImportedBankMovementsRequest();

    request.setSearchValue(searchValue);

    request.setBankAccountId(
      getValidInteger(bankAccountId)
    );
    request.setBankAccountUuid(bankAccountUuid);

    request.setBusinessPartnerId(
      getValidInteger(businessPartnerId)
    );
    request.setBusinessPartnerUuid(businessPartnerUuid);

    const { getDecimalToGRPC } = require('@adempiere/grpc-api/src/utils/baseDataTypeToGRPC.js');
    request.setPaymentAmountFrom(
      getDecimalToGRPC(paymentAmountFrom)
    );
    request.setPaymentAmountTo(
      getDecimalToGRPC(paymentAmountTo)
    );

    request.setTransactionDateFrom(
      getTimestamp(transactionDateFrom)
    );
    request.setTransactionDateTo(
      getTimestamp(transactionDateTo)
    );

    request.setMatchMode(
      getValidInteger(matchMode)
    );

    request.setPageSize(
      getValidInteger(pageSize)
    );
    request.setPageToken(pageToken);

    const metadata = getMetadata({
      token
    });

    this.getBankStatementMatchService().listImportedBankMovements(
      request,
      metadata,
      callback
    );
  }


  /**
   * Get List Payments
   * @param {string} token
   * @param {string} searchValue
   * @param {number} pageSize
   * @param {string} pageToken
   */
  listPayments({
    token,
    // DSL
    searchValue,
    bankAccountId,
    bankAccountUuid,
    businessPartnerId,
    businessPartnerUuid,
    paymentAmountFrom,
    paymentAmountTo,
    transactionDateFrom,
    transactionDateTo,
    matchMode,
    // Page Data
    pageSize,
    pageToken
  }, callback) {
    const { ListPaymentsRequest } = this.stubFile;
    const request = new ListPaymentsRequest();

    request.setSearchValue(searchValue);

    request.setPageSize(
      getValidInteger(pageSize)
    );
    request.setPageToken(pageToken);

    request.setBankAccountId(
      getValidInteger(bankAccountId)
    );
    request.setBankAccountUuid(bankAccountUuid);

    request.setBusinessPartnerId(
      getValidInteger(businessPartnerId)
    );
    request.setBusinessPartnerUuid(businessPartnerUuid);

    const { getDecimalToGRPC } = require('@adempiere/grpc-api/src/utils/baseDataTypeToGRPC.js');
    request.setPaymentAmountFrom(
      getDecimalToGRPC(paymentAmountFrom)
    );
    request.setPaymentAmountTo(
      getDecimalToGRPC(paymentAmountTo)
    );

    request.setTransactionDateFrom(
      getTimestamp(transactionDateFrom)
    );
    request.setTransactionDateTo(
      getTimestamp(transactionDateTo)
    );

    request.setMatchMode(
      getValidInteger(matchMode)
    );

    const metadata = getMetadata({
      token
    });

    this.getBankStatementMatchService().listPayments(
      request,
      metadata,
      callback
    );
  }


  /**
   * Get List Matching Movements
   * @param {string} token
   * @param {string} searchValue
   * @param {number} pageSize
   * @param {string} pageToken
   */
  listMatchingMovements({
    token,
    // DSL
    searchValue,
    bankAccountId,
    bankAccountUuid,
    businessPartnerId,
    businessPartnerUuid,
    paymentAmountFrom,
    paymentAmountTo,
    transactionDateFrom,
    transactionDateTo,
    matchMode,
    // Page Data
    pageSize,
    pageToken
  }, callback) {
    const { ListMatchingMovementsRequest } = this.stubFile;
    const request = new ListMatchingMovementsRequest();

    request.setSearchValue(searchValue);
    request.setPageSize(
      getValidInteger(pageSize)
    );
    request.setPageToken(pageToken);

    request.setBankAccountId(
      getValidInteger(bankAccountId)
    );
    request.setBankAccountUuid(bankAccountUuid);

    request.setBusinessPartnerId(
      getValidInteger(businessPartnerId)
    );
    request.setBusinessPartnerUuid(businessPartnerUuid);

    const { getDecimalToGRPC } = require('@adempiere/grpc-api/src/utils/baseDataTypeToGRPC.js');
    request.setPaymentAmountFrom(
      getDecimalToGRPC(paymentAmountFrom)
    );
    request.setPaymentAmountTo(
      getDecimalToGRPC(paymentAmountTo)
    );

    request.setTransactionDateFrom(
      getTimestamp(transactionDateFrom)
    );
    request.setTransactionDateTo(
      getTimestamp(transactionDateTo)
    );

    request.setMatchMode(
      getValidInteger(matchMode)
    );

    const metadata = getMetadata({
      token
    });

    this.getBankStatementMatchService().listMatchingMovements(
      request,
      metadata,
      callback
    );
  }


  /**
   * Process Payment Allocation
   * @param {string} token
   * @param {number} businessPartnerId
   * @param {string} businessPartnerUuid
   * @param {number} currencyId
   * @param {string} currencyUuid
   * @param {number} chargeId
   * @param {string} chargeUuid
   * @param {number} transactionOrganizationId
   * @param {string} transactionOrganizationUuid
   * @param {Date} date
   * @param {Array} paymentSelectionsList
   * @param {Array} invoiceSelectionList
   */
  processMovements({
    token,
    // DSL
    bankAccountId,
    bankAccountUuid,
    businessPartnerId,
    businessPartnerUuid,
    paymentAmountFrom,
    paymentAmountTo,
    transactionDateFrom,
    transactionDateTo,
    matchMode,
    macthingSelectionsList = []
  }, callback) {
    const { ProcessMovementsRequest } = this.stubFile;
    const request = new ProcessMovementsRequest();

    request.setBankAccountId(
      getValidInteger(bankAccountId)
    );
    request.setBankAccountUuid(bankAccountUuid);

    request.setBusinessPartnerId(
      getValidInteger(businessPartnerId)
    );
    request.setBusinessPartnerUuid(businessPartnerUuid);

    const { getDecimalToGRPC } = require('@adempiere/grpc-api/src/utils/baseDataTypeToGRPC.js');
    request.setPaymentAmountFrom(
      getDecimalToGRPC(paymentAmountFrom)
    );
    request.setPaymentAmountTo(
      getDecimalToGRPC(paymentAmountTo)
    );

    request.setTransactionDateFrom(
      getTimestamp(transactionDateFrom)
    );
    request.setTransactionDateTo(
      getTimestamp(transactionDateTo)
    );

    request.setMatchMode(
      getValidInteger(matchMode)
    );

    const { getKeyValueSelectionToGRPC } = require('@adempiere/grpc-api/src/utils/baseDataTypeToGRPC.js');
    // payment selections list
    macthingSelectionsList.forEach(matchMovement => {
      // selection format = { selectionId: number, selectionValues: [{ columName, value, valueType }] }
      const convertedRecord = getKeyValueSelectionToGRPC({
        selectionId: matchMovement.recordId,
        selectionUuid: matchMovement.recordUuid,
        selectionValues: matchMovement.attributesList
      });

      request.addMatchingMovements(convertedRecord);
    });

    const metadata = getMetadata({
      token
    });

    this.getBankStatementMatchService().processMovements(
      request,
      metadata,
      callback
    );
  }

}

module.exports = BankStatementMatch;
