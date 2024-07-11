/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record', 'N/search','N/url','N/render'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{search} search
 */
    (email, record, search,url, render) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {    
            var newRecord = scriptContext.newRecord;

            let recordUrl = url.resolveRecord({
                recordType: scriptContext.newRecord.type,
                recordId: scriptContext.newRecord.id
                });


            let name = newRecord.getValue("custrecord_jj_ak_name");
            let country = newRecord.getValue("custrecord_jj_ak_country");
            let age = newRecord.getValue("custrecord_jj_ak_age");
            let phone = newRecord.getValue("custrecord_jj_ak_phone");
            let email = newRecord.getValue("custrecord_jj_ak_email");
            let language = newRecord.getValue("custrecord_jj_ak_language");
            let baseCurrency = newRecord.getValue("custrecord_jj_ak_base_currency");
            let transactionCurrency = newRecord.getValue("custrecord_jj_ak_transaction_currency");
            let feeAmount = newRecord.getValue("custrecord_jj_ak_fee_amount");
            let exhangeRate = newRecord.getValue("custrecord_jj_ak_exchange_rate");
        
            pdfContents = "Name: "+name+
            "-Country: "+country+
            "-Age: "+age+
            "-Phone: "+phone+
            "-Email: "+email+
            "-Language: "+language+
            "-Base Currency: "+baseCurrency+
            "-Transaction Currency: "+transactionCurrency+
            "-Fee Amount: "+feeAmount+
            "-Exchange Rate: "+exhangeRate;
        
           
            let pdf = render.transaction({
                
             
            });
        
            //snd mail from netsuite to all netsuite admins
            email.send({
              author: 1,
              recipients: -5,
              subject: "Tution Fee Query Received for Training"+recordUrl,
              body: "Custom Record:" ,
              attachments: [pdf],
            });





          


        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
