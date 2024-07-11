/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(["N/record", "N/search", "N/email", "N/file", "N/http"]
/**
 * @param{email} email
 * @param{file} file
 * @param{record} record
 * @param{search} search
 * @param{http} http
 */, function (record, email, file, search, http) {
  /**
   * Function to be executed after page is initialized.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.currentRecord - Current form record
   * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
   *
   * @since 2015.2
   */
  function pageInit(scriptContext) {
    let currentRecord = scriptContext.currentRecord;
    let fieldID = currentRecord.getField({
      fieldId: "custrecord_jj_ak_base_currency",
    });
    fieldID.isDisabled = true;
    currentRecord.setValue("custrecord_jj_ak_base_currency", 5);
  }

  function fieldChanged(scriptContext) {
    try {
      let currentRecord = scriptContext.currentRecord;
      let courseId = currentRecord.getValue("custrecord_jj_ak_language");
      let fieldId = scriptContext.fieldId
      
      if (fieldId=="custrecord_jj_ak_language") {
        // console.log(courseId);
        //   log.debug(courseId);

        //loading the fee record
        let feeRecord = record.load({
          type: "customrecord_jj_fee_record",
          id: courseId,
        });

        //accepting fee amount from the fee record
        let feeAmount = feeRecord.getValue("custrecord_jj_fee_amount");
        //   console.log(feeAmount);
        currentRecord.setValue("custrecord_jj_ak_fee_amount", feeAmount);
      }

     
      let transactionCurrency = currentRecord.getValue(
        "custrecord_jj_ak_transaction_currency"
      );
      console.log(transactionCurrency);

      if(fieldId == "custrecord_jj_ak_transaction_currency" ){
      const baseUrl =
        "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_gIHHlCP2DtroHqbu7p9oGsqFnW31NuXQILwKi3Tw&currencies=EUR%2CUSD%2CCAD%2CGBP&base_currency=INR";
      const User = async () => {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status:${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        let eur = data.data.EUR;
        let usd = data.data.USD;
        let cad = data.data.CAD;
        let gbp = data.data.GBP;
        console.log(feeAmount);
        // let dataid = data.data
        // console.log(dataid);
        // console.log(eur);
        // console.log(usd);
        // console.log(cad);
        // console.log(gbp);

        //compare with the transaction currency
        if (transactionCurrency == 4) {
          currentRecord.setValue(
            "custrecord_jj_ak_exchange_rate",
            feeAmount * eur
          );
        } else if (transactionCurrency == 1) {
          currentRecord.setValue(
            "custrecord_jj_ak_exchange_rate",
            feeAmount * usd
          );
        } else if (transactionCurrency == 3) {
          currentRecord.setValue(
            "custrecord_jj_ak_exchange_rate",
            feeAmount * cad
          );
        } else if (transactionCurrency == 2) {
          currentRecord.setValue(
            "custrecord_jj_ak_exchange_rate",
            feeAmount * gbp
          );
        }
      };
      
        User();
    }
      
    } catch (e) {
      log.error(e);
    }
  }

  function saveRecord(scriptContext) {
    // let currentRecord = scriptContext.currentRecord;
    // let name = currentRecord.getValue("custrecord_jj_ak_name");
    // let country = currentRecord.getValue("custrecord_jj_ak_country");
    // let age = currentRecord.getValue("custrecord_jj_ak_age");
    // let phone = currentRecord.getValue("custrecord_jj_ak_phone");
    // let email = currentRecord.getValue("custrecord_jj_ak_email");
    // let language = currentRecord.getValue("custrecord_jj_ak_language");
    // let baseCurrency = currentRecord.getValue("custrecord_jj_ak_base_currency");
    // let transactionCurrency = currentRecord.getValue("custrecord_jj_ak_transaction_currency");
    // let feeAmount = currentRecord.getValue("custrecord_jj_ak_fee_amount");
    // let exhangeRate = currentRecord.getValue("custrecord_jj_ak_exchange_rate");
    // pdfContents = "Name: "+name+
    // "-Country: "+country+
    // "-Age: "+age+
    // "-Phone: "+phone+
    // "-Email: "+email+
    // "-Language: "+language+
    // "-Base Currency: "+baseCurrency+
    // "-Transaction Currency: "+transactionCurrency+
    // "-Fee Amount: "+feeAmount+
    // "-Exchange Rate: "+exhangeRate;
    // let pdf = render.transaction({
    //     recordType: "CUSTOMRECORD_JJ_AKSHAYA_TRAINING",
    //     recordId: scriptContext.currentRecord.id,
    //     contents: pdfContents,
    //     printMode:render.PrintMode.PDF
    // });
    // //snd mail from netsuite to all netsuite admins
    // email.send({
    //   author: 1,
    //   recipients: -5,
    //   subject: "Tution Fee Query Received for Training",
    //   body: "Custom Record:" ,
    //   attachments: [pdf],
    // });
  }

  return {
    pageInit: pageInit,
    fieldChanged: fieldChanged,
    // postSourcing: postSourcing,
    // sublistChanged: sublistChanged,
    // lineInit: lineInit,
    // validateField: validateField,
    // validateLine: validateLine,
    // validateInsert: validateInsert,
    // validateDelete: validateDelete,
    // saveRecord: saveRecord,
  };
});
