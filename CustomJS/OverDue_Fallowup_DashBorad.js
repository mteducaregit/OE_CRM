﻿window.load = function () {
    Android.onPageLoadStart();
}
window.onload = function () {
    Android.onPageLoadComplete();
}
function loaderStart() {
    Android.onPageLoadStart();
}
function loaderStop() {
    Android.onPageLoadComplete();
}
window.onerror = stoperror();

function stoperror() {
    return true;
}

function NumberOnly() {
    var AsciiValue = event.keyCode
    if ((AsciiValue >= 48 && AsciiValue <= 57) || (AsciiValue == 8 || AsciiValue == 127))
        event.returnValue = true;
    else
        event.returnValue = false;
}

var ConId;
var Campaign;

$(document).ready(function () {
    toastr.options = {   //for Close Button in toaster
        "closeButton": true
    };

    ReadConfigSettings();
    var key = document.getElementById("lblCampaignDetailcode").value;
    //alert('hi123-' + key);

    var Chk = getCookie('typevalue');
    if (Chk == 'M') {
        Android.isBackClicked(true, "http://oe.mteducare.com/oe_crm/Dashboard.aspx");
    }
    //       window.scrollTo(0, 0); // to set focus to top of the page

    AcadYearFill();
    //CampaignFill();
  
    InstitutionType();
    Board();
    FillExamName();
    var count;
    DivisionFill();
    PayPlanFill();
    InteractedRelFill();
    FollowupStatusFill();
    Lost_Followup_Reasons();
    Followup_Remark_Conclusion();
    CampaignOverdueFill();
    //alert("sujeer");
    /// controlVisiblity('AssignedCampaign');
    // controlVisiblity('CampaignDetail');
    //Assignedcampaign();

    $('#ddlDivision').on('change', function () {  //To Bind Center Based On Division In Convert To Lead Div
        $("#ddlCenter option").remove();
        $("#ddlCenter").append($("<option></option>").val("0").html("Select"));
        if (this.value != '0') {
            CenterFill(this.value);
        }
    });

    $('#ddlOpportunityDivision').on('change', function () {   //To Bind Center Based On Division In Convert To Opportunity Div 
        $("#ddlOpportunityCenter option").remove();
        $("#ddlOpportunityCenter").append($("<option></option>").val("0").html("Select"));
        if (this.value != '0') {
            CampaignCenterFill(this.value);
        }
    });

    $('#ddlBookAdmissionDivision').on('change', function () {   //To Bind Center Based On Division In Book Admission Div 
        $("#ddlBookAdmissionCenter option").remove();
        $("#ddlBookAdmissionCenter").append($("<option></option>").val("0").html("Select"));
        if (this.value != '0') {
            BookAdmissionCenterFill(this.value);
        }
    });

    $('#ddlconfirmedAdmissionDivision').on('change', function () {   //To Bind Center Based On Division In Book Admission Div 
        $("#ddlconfirmedAdmissionCenter option").remove();
        $("#ddlconfirmedAdmissionCenter").append($("<option></option>").val("0").html("Select"));
        if (this.value != '0') {
            ConfirmedadmissionCenterFill(this.value);
        }
    });

    $('#ddlOpportunityCenter').on('change', function () {  //To Bind Product Based On Acad Year and Center In Convert To Opportunity Div 
        $("#ddlProduct option").remove();
        $("#ddlProduct").append($("<option></option>").val("0").html("Select"));
        if (this.value != '0') {
            var AcadYear = $("#ddlOpportunityAcadYear").val;
            ProductFill(this.value, AcadYear);
        }
    });

    $('#ddlBookAdmissionCenter').on('change', function () {  //To Bind Subjects Based On Product and Center In Book Admission Div
        if (this.value != '0') {
            var Product = $("#lblBookAdmissionProduct").val;
            SubjectData(this.value, Product);
        }
    });

    $('#ddlEvent').on('change', function () {   //To Bind Event Type Based On Event 

        $("#ddlEventType option").remove();
        $("#ddlEventType").append($("<option></option>").val("0").html("Select"));
        if (this.value != '0') {
            CampaignEventTypeFill(this.value);
        }
        $('#ddlEventType').selectpicker('refresh');
        //        $("#ddlAttendance").val('Select').change();
        //        $('#ddlAttendance').selectpicker('refresh');
        $("#ddlAttendance").val(0).change();
        //$("#ddlFeedbackHeader").val('Select').change();
        $("#ddlFeedbackHeader").val(0).change();
        $("#ddlFeedbackValues").val(0).change();
        $("#trAttendance").css('display', 'none');
        $("#trFeedbackHeader").css('display', 'none');
        $("#trFeedbackValues").css('display', 'none');
    });

    $('#ddlEventType').on('change', function () {   //Check Feedback header and Attendance Visibility          
        $("#ddlAttendance").val(0).change();
        $("#ddlFeedbackHeader").val(0).change();
        $("#ddlFeedbackValues").val(0).change();
        if (this.value == "Attendance") {
            $("#trAttendance").css('display', 'block');
            $("#trFeedbackHeader").css('display', 'none');
            $("#trFeedbackValues").css('display', 'none');
            $("#trAttendance").css('display', 'table-row');
        }
        else if (this.value == "Feedback") {
            $("#trAttendance").css('display', 'none');
            $("#trFeedbackHeader").css('display', 'block');
            $("#trFeedbackValues").css('display', 'block');
            $("#trFeedbackHeader").css('display', 'table-row');
            $("#trFeedbackValues").css('display', 'table-row');

            $("#ddlFeedbackHeader option").remove();
            $("#ddlFeedbackHeader").append($("<option></option>").val("0").html("Select"));
            CampaignEventFeedbackHeader();
            $('#ddlFeedbackHeader').selectpicker('refresh');

            $("#ddlFeedbackValues option").remove();
            $("#ddlFeedbackValues").append($("<option></option>").val("0").html("Select"));
            $('#ddlFeedbackValues').selectpicker('refresh');
        }
        else {
            $("#trAttendance").css('display', 'none');
            $("#trFeedbackHeader").css('display', 'none');
            $("#trFeedbackValues").css('display', 'none');
        }
    });

    $('#ddlFeedbackHeader').on('change', function () {   //Bind Feedback Values
        $("#ddlFeedbackValues option").remove();
        $("#ddlFeedbackValues").append($("<option></option>").val("0").html("Select"));
        if (this.value != '0') {
            CampaignEventFeedbackValues();
        }
        $('#ddlFeedbackValues').selectpicker('refresh');
    });


    $("#btnAssignedCampaignHome").click(function () {   //Redirecting To Dashboard Page In Search campaign div
        waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
        window.location.assign("Dashboard.aspx");
        waitingDialog.hide();
    });
    $("#btnCampaignDetailHome").click(function () {   //Redirecting To Dashboard Page In Search campaign div
        waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
        //controlVisiblity("CampaignDetail");
        window.location.href = "Dashboard.aspx";
        waitingDialog.hide();
    });
    $("#btnSearchCampaignHome").click(function () {   //Redirecting To Dashboard Page In Search campaign div
        waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
        controlVisiblity("CampaignDetail");
        waitingDialog.hide();
    });
    $("#btnDataCampaignHome").click(function () {    //Redirecting To Search Campaign From Result Grid Div
        waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
        controlVisiblity('Search');
        waitingDialog.hide();
    });
    $("#btnConvertToLeadHome").click(function () {   //Redirecting To Result Grid From convert to Lead div
        waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
        controlVisiblity('CampaignCountSearch');
        waitingDialog.hide();
    });
    $("#btnConvertToOpportunityHome").click(function () {   //Redirecting To Result Grid From convert to Opportunity div
        waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
        controlVisiblity('CampaignCountSearch');
        waitingDialog.hide();
    });
    $("#btnBookAdmissionHome").click(function () {    //Redirecting To Result Grid From Book Admission div
        waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
        var result3 = DeletePricingprocedurevalue();
        controlVisiblity('CampaignCountSearch');
        waitingDialog.hide();
    });
    $("#btnBookAdmissionConfirmedHome").click(function () {  //Redirecting To Book Admission div from Confirmed Book Admission div
        waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
        controlVisiblity('BookAdmission');
        waitingDialog.hide();
    });
    $("#btnFollowUpHome").click(function () {  //Redirecting To Result Grid From Follow Up div
        waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
        controlVisiblity('CampaignCountSearch');
        waitingDialog.hide();
    });
    $("#btnCampaigncountHome").click(function () {  //Redirecting To Result Grid From Follow Up div
        waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
        //controlVisiblity('CampaignDetail');
        window.location.href = "Dashboard.aspx";
        waitingDialog.hide();
    });
    $('#btnLeadClose').click(function () {
        waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
        controlVisiblity('CampaignCountSearch');
        waitingDialog.hide();
    });
    $('#btnOpportunityClose').click(function () {
        waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
        controlVisiblity('CampaignCountSearch');
        waitingDialog.hide();
    });
    $('#btnbookAdmissionClose').click(function () {
        waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
        $("#divbookAdmissionProceedButton").css('display', 'inline');
        var result2 = DeletePricingprocedurevalue();
        controlVisiblity('CampaignCountSearch');
        waitingDialog.hide();
    });
    $('#btnFollowupClose').click(function () {
        waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
        controlVisiblity('CampaignCountSearch');
        waitingDialog.hide();
    });
    $('#btnbookAdmissionProceed').click(function () {
        BtnProceedClick();
    });
    $('#btnLeadSave').click(function () {   //To save data in convert to lead div
        var AcadYear = $("#ddlAcadYear").val();
        var Division = $("#ddlDivision").val();
        var Center = $("#ddlCenter").val();
        SaveConvertContactToLeadData(AcadYear, Division, Center);
    });
    $('#btnOpportunitySave').click(function () {    //To save data in convert to opportunity div
        var AcadYear = $("#ddlOpportunityAcadYear").val();
        var Division = $("#ddlOpportunityDivision").val();
        var Center = $("#ddlOpportunityCenter").val();
        var SalesStage = $("#ddlSalesStage").val();
        var Product = $("#ddlProduct").val();
        var ClosureDate = $("#txtClosuredate1").val();
        var Probability = $("#txtProbability").val();
        SaveConvertLeadToOpportunityData(AcadYear, Division, Center, SalesStage, Product, ClosureDate, Probability);
    });
    $('#btnFollowupSave').click(function () {   //To save data in followup div
        SaveFollowupData();
    });
    $('#btnConvertYes').click(function () {   //To visible the Convert to Lead<ooportunity, Admission
        //if Lead is not created then Lead creation Div Display        
        var Campaign_Contact_Code = document.getElementById("lblCampaign_Contact_Code").value;
        var Lead_Code = document.getElementById("lblLead_Code").value;
        var Opportunity_Code = document.getElementById("lblOpportunity_Code").value;
        var Account_Id = document.getElementById("lblAccount_Id").value;

        //alert(Campaign_Contact_Code + ' LeadCode-' + Lead_Code + ' OppId-' + Opportunity_Code + ' AccId-' + Account_Id);
        if (Lead_Code == 'Blank') {
            ConvertToLead1(Campaign_Contact_Code);
        } //if Opportunity is not created then Opportunity creation Div Display
        else if (Opportunity_Code == 'Blank') {
            ConvertToOpportunity1(Lead_Code);
        } //if Admission is not created then Admission creation Div Display
        else if (Account_Id == 'Blank') {
            BookAdmission1(Opportunity_Code);
        }
    });

    $('#btnConvertNo').click(function () {   //To visible the Convert to Lead<ooportunity, Admission
        var CId = document.getElementById("lblCampaignDetailcode").value;
        ViewCampaignCountData(CId);
        GetCampaignCountDetailsData();
        controlVisiblity('CampaignCountSearch');
    });

    $('#txtCampName').keyup(function () {
        this.value = this.value.toUpperCase();
        GetSpecificCampaign(this.value);
    });

    $('#btnSpecificCampaignSearch').click(function () {
        waitingDialog.show('Please wait....', { dialogSize: 'sm', progressType: 'warning' });
        var Campaign = document.getElementById("txtCampName").value;
        GetSpecificCampaign(Campaign);
        waitingDialog.hide();
    });

    $('#btnCampaignSearch').click(function () {
        document.getElementById("lblPageNo").value = 1;
        GetCampaignCountDetailsSearchData();
        waitingDialog.hide();
    });
    $('#btnSubmit').click(function () {
        SaveStudentadmissiondata();
    });




    $("#tdTotalCamapignCount").click(function () {
        waitingDialog.show('Please wait while the data is getting populated', { dialogSize: 'm', progressType: 'warning' });
        ClearAdvanceCampaignSearch();
        //        document.getElementById("txtCampStudentName").value = "";
        //        //document.getElementById("txtCampSchoolName").value = "";
        //        $("#ddlMTNMT").val('Select').change();
        //        $("#ddlInstitutionType").val(0).change();
        //        //        $("#ddlClassStandard option").remove();
        //        //        $("#ddlClassStandard").append($("<option></option>").val("0").html("Select"));
        //        $("#ddlSchoolName").val(0).change();
        //        $("#ddlExam").val(0).change();
        //        document.getElementById("txtXcenter").value = "";
        //        //        document.getElementById("txtBoard").value = "";
        //        document.getElementById("txtFromRank").value = "";
        //        document.getElementById("txtToRank").value = "";
        //        document.getElementById("txtToRank").value = "";
        document.getElementById("lblCamapignflag").value = 4;
        document.getElementById("lblPageNo").value = 1;
        GetCampaignCountDetailsData();
        waitingDialog.hide();
    });

    $("#tdPendingContacts").click(function () {
        waitingDialog.show('Please wait while the data is getting populated', { dialogSize: 'sm', progressType: 'warning' });
        ClearAdvanceCampaignSearch();
        //        document.getElementById("txtCampStudentName").value = "";
        //        //document.getElementById("txtCampSchoolName").value = "";
        //        $("#ddlMTNMT").val('Select').change();
        //        $("#ddlInstitutionType").val(0).change();
        //        //        $("#ddlClassStandard option").remove();
        //        //        $("#ddlClassStandard").append($("<option></option>").val("0").html("Select"));
        //        $("#ddlSchoolName").val(0).change();
        //        $("#ddlExam").val(0).change();
        //        document.getElementById("txtXcenter").value = "";
        //        //document.getElementById("txtBoard").value = "";
        //        document.getElementById("txtFromRank").value = "";
        //        document.getElementById("txtToRank").value = "";
        //        document.getElementById("txtToRank").value = "";
        document.getElementById("lblCamapignflag").value = 5;
        document.getElementById("lblPageNo").value = 1;
        GetCampaignCountDetailsData();
        waitingDialog.hide();
    });


    $("#tdAvailableOpportunity").click(function () {
        waitingDialog.show('Please wait while the data is getting populated', { dialogSize: 'sm', progressType: 'warning' });
        ClearAdvanceCampaignSearch();
        //        document.getElementById("txtCampStudentName").value = "";
        //        //document.getElementById("txtCampSchoolName").value = "";
        //        $("#ddlMTNMT").val('Select').change();
        //        $("#ddlInstitutionType").val(0).change();
        //        //        $("#ddlClassStandard option").remove();
        //        //        $("#ddlClassStandard").append($("<option></option>").val("0").html("Select"));
        //        $("#ddlSchoolName").val(0).change();
        //        $("#ddlExam").val(0).change();
        //        document.getElementById("txtXcenter").value = "";
        //        //document.getElementById("txtBoard").value = "";
        //        document.getElementById("txtFromRank").value = "";
        //        document.getElementById("txtToRank").value = "";
        document.getElementById("lblCamapignflag").value = 2;
        document.getElementById("lblPageNo").value = 1;
        GetCampaignCountDetailsData();
        waitingDialog.hide();
    });



    $("#tdTodaysFollowup").click(function () {
        waitingDialog.show('Please wait while the data is getting populated', { dialogSize: 'sm', progressType: 'warning' });
        ClearAdvanceCampaignSearch();
        //        document.getElementById("txtCampStudentName").value = "";
        //        //document.getElementById("txtCampSchoolName").value = "";
        //        $("#ddlMTNMT").val('Select').change();
        //        $("#ddlInstitutionType").val(0).change();
        //        //        $("#ddlClassStandard option").remove();
        //        //        $("#ddlClassStandard").append($("<option></option>").val("0").html("Select"));
        //        $("#ddlSchoolName").val(0).change();
        //        $("#ddlExam").val(0).change();
        //        document.getElementById("txtXcenter").value = "";
        //        //document.getElementById("txtBoard").value = "";
        //        document.getElementById("txtFromRank").value = "";
        //        document.getElementById("txtToRank").value = "";
        document.getElementById("lblCamapignflag").value = 7;
        document.getElementById("lblPageNo").value = 1;
        GetCampaignCountDetailsData();
        waitingDialog.hide();
    });

    $("#tdOverdueFollowup").click(function () {
        waitingDialog.show('Please wait while the data is getting populated', { dialogSize: 'sm', progressType: 'warning' });
        ClearAdvanceCampaignSearch();
        //        document.getElementById("txtCampStudentName").value = "";
        //        //document.getElementById("txtCampSchoolName").value = "";
        //        $("#ddlMTNMT").val('Select').change();
        //        $("#ddlInstitutionType").val(0).change();
        //        //        $("#ddlClassStandard option").remove();
        //        //        $("#ddlClassStandard").append($("<option></option>").val("0").html("Select"));
        //        $("#ddlSchoolName").val(0).change();
        //        $("#ddlExam").val(0).change();
        //        document.getElementById("txtXcenter").value = "";
        //        //document.getElementById("txtBoard").value = "";
        //        document.getElementById("txtFromRank").value = "";
        //        document.getElementById("txtToRank").value = "";
        document.getElementById("lblCamapignflag").value = 15;
        document.getElementById("lblPageNo").value = 1;
        GetCampaignCountDetailsData();
        waitingDialog.hide();
    });


    $('#btnCamapignCountSearch').click(function () {
        controlVisiblity('CampaignCountSearch');
        CampaignCountSearchData();
    });


    $('#ddlInstitutionType').on('change', function () {
        var InstitutionType = document.getElementById("ddlInstitutionType").value;
        $("#ddlClassStandard option").remove();
        $("#ddlClassStandard").append($("<option></option>").val("0").html("Select"));
        if (this.value != '0') {
            StandardFill(this.value);
        }
        $('#ddlClassStandard').selectpicker('refresh');
    });

    $('#ddlExam').on('change', function () {

        $("#ddlExamStatus option").remove();
        $("#ddlExamStatus").append($("<option></option>").val("0").html("Select"));
        if (this.value != '0') {
            ExamStatusFill(this.value);
        }
        $('#ddlExamStatus').selectpicker('refresh');
    });

    $('#ddlAcadYear').on('change', function () {
        var AcadYear = document.getElementById("ddlAcadYear").value;
        if (AcadYear == "0") {
            document.getElementById('lblAcadYear').innerHTML = "Select Acad Year";
            $('[data-id="ddlAcadYear"]').addClass('errorClass');
        }
        else {
            document.getElementById('lblAcadYear').innerHTML = "";
            $('[data-id="ddlAcadYear"]').addClass('sucessClass');
        }
    });

    $('#ddlDivision').on('change', function () {
        var Division = document.getElementById("ddlDivision").value;
        if (Division == "0") {
            document.getElementById('lblDivision').innerHTML = "Select Division";
            $('[data-id="ddlDivision"]').addClass('errorClass');
        }
        else {
            document.getElementById('lblDivision').innerHTML = "";
            $('[data-id="ddlDivision"]').addClass('sucessClass');
        }
    });

    $('#ddlCenter').on('change', function () {
        var Center = document.getElementById("ddlCenter").value;
        if (Center == "0") {
            document.getElementById('lblCenter').innerHTML = "Select Center";
            $('[data-id="ddlCenter"]').addClass('errorClass');
        }
        else {
            document.getElementById('lblCenter').innerHTML = "";
            $('[data-id="ddlCenter"]').addClass('sucessClass');
        }
    });

    $('#ddlSalesStage').on('change', function () {
        var SalesStage = document.getElementById("ddlSalesStage").value;
        if (SalesStage == "0") {
            document.getElementById('lblsalesStage').innerHTML = "Select Sales Stage";
            $('[data-id="ddlSalesStage"]').addClass('errorClass');
        }
        else {
            document.getElementById('lblsalesStage').innerHTML = "";
            $('[data-id="ddlSalesStage"]').addClass('sucessClass');
        }
    });

    $('#ddlProduct').on('change', function () {
        var Product = document.getElementById("ddlProduct").value;
        if (Product == "0") {
            document.getElementById('lblProduct').innerHTML = "Select Product";
            $('[data-id="ddlProduct"]').addClass('errorClass');
        }
        else {
            document.getElementById('lblProduct').innerHTML = "";
            $('[data-id="ddlProduct"]').addClass('sucessClass');
        }
    });

    $("#txtClosuredate1").change(function () {
        var closuredate = document.getElementById("txtClosuredate1").value;
        if (closuredate == "") {
            document.getElementById('lblClosuredate').innerHTML = "Enter Closure Date";
            $("#txtClosuredate").addClass('errorClass');
        }
        else {
            document.getElementById('lblClosuredate').innerHTML = "";
            $("#txtClosuredate").addClass('sucessClass');
        }
    });

    $('#txtProbability').keyup(function () {
        var Probability = document.getElementById("txtProbability").value;
        if (Probability == "") {
            document.getElementById('lblProbability').innerHTML = "Enter Probability";
            $("#txtProbability").addClass('errorClass');
        }
        else {
            document.getElementById('lblProbability').innerHTML = "";
            $("#txtProbability").addClass('sucessClass');
        }
    });

    $('#ddlPayPlan').on('change', function () {
        var Payplan = document.getElementById("ddlPayPlan").value;
        if (Payplan == "0") {
            document.getElementById('lblPayplan').innerHTML = "Select Pay Plan";
            $('[data-id="ddlPayPlan"]').addClass('errorClass');

        }
        else {
            document.getElementById('lblPayplan').innerHTML = "";
            $('[data-id="ddlPayPlan"]').addClass('sucessClass');
        }
    });

    $('#ddlInteractedRel').on('change', function () {
        var InteractedRel = document.getElementById("ddlInteractedRel").value;
        if (InteractedRel == "0") {
            document.getElementById('lblInteractedrel').innerHTML = "Select Interacted Rel.";
            $('[data-id="ddlInteractedRel"]').addClass('errorClass');
        }
        else {
            document.getElementById('lblInteractedrel').innerHTML = "";
            $('[data-id="ddlInteractedRel"]').addClass('sucessClass');
        }
    });

    $('#ddlFollowupStatus').on('change', function () {
        var FollowupStatus = document.getElementById("ddlFollowupStatus").value;
        if (FollowupStatus == "0") {
            document.getElementById('lblFollowupstatus').innerHTML = "Select Followup Status";
            $('[data-id="ddlFollowupStatus"]').addClass('errorClass');
        }
        else {
            document.getElementById('lblFollowupstatus').innerHTML = "";
            $('[data-id="ddlFollowupStatus"]').addClass('sucessClass');
        }

        if (this.value != '01') {
            $("#trLostFollowupReason").css('display', 'none');
            $("#trRemarkClosure").css('display', 'block');
            $("#trRemarkClosure").css('display', 'table-row');
            $("#trNextFollowupDate").css('display', 'block');
            $("#trNextFollowupDate").css('display', 'table-row');
        }
        else {
            $("#trLostFollowupReason").css('display', 'block');
            $("#trLostFollowupReason").css('display', 'table-row');
            $("#trRemarkClosure").css('display', 'none');
            $("#trNextFollowupDate").css('display', 'none');
        }
    });

    $('#ddlLostFollowupReason').on('change', function () {
        var LostFollowupReason = document.getElementById("ddlLostFollowupReason").value;
        if (LostFollowupReason == "0") {
            document.getElementById('lblLostFollowupReason').innerHTML = "Select Lost Followup Reason";
            $('[data-id="ddlLostFollowupReason"]').addClass('errorClass');
        }
        else {
            document.getElementById('lblLostFollowupReason').innerHTML = "";
            $('[data-id="ddlLostFollowupReason"]').addClass('sucessClass');
        }
    });

    $('#ddlRemarkConclusion').on('change', function () {
        var RemarkConclusion = document.getElementById("ddlRemarkConclusion").value;
        if (RemarkConclusion == "0") {
            document.getElementById('lblRemarkConclusion').innerHTML = "Select Remark Conclusion";
            $('[data-id="ddlRemarkConclusion"]').addClass('errorClass');
        }
        else {
            document.getElementById('lblRemarkConclusion').innerHTML = "";
            $('[data-id="ddlRemarkConclusion"]').addClass('sucessClass');
        }
    });

    $('#txtFeedBack').keyup(function () {
        var FeedBack = document.getElementById("txtFeedBack").value;
        if (FeedBack == "") {
            document.getElementById('lblFeedback').innerHTML = "Enter Feedback";
            $("#txtFeedBack").addClass('errorClass');
        }
        else {
            document.getElementById('lblFeedback').innerHTML = "";
            $("#txtFeedBack").addClass('sucessClass');
        }
    });

    $("#txtFollowupDate1").change(function () {
        var FollowupDate = document.getElementById("txtFollowupDate1").value;
        if (FollowupDate == "") {
            document.getElementById('lblNextFollowupdate').innerHTML = "Enter Next Followup Date";
            $("#txtFollowupDate").addClass('errorClass');
        }
        else {
            document.getElementById('lblNextFollowupdate').innerHTML = "";
            $("#txtFollowupDate").addClass('sucessClass');
        }
    });

    $("#btnPrev").click(function () {
        waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
        controlVisiblity('CampaignCountSearch');
        document.getElementById("lblPageNo").value = parseInt(document.getElementById("lblPageNo").value) - 1;
        GetCampaignCountDetailsData();
        waitingDialog.hide();
    });

    $("#btnNext").click(function () {
        waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
        controlVisiblity('CampaignCountSearch');
        document.getElementById("lblPageNo").value = parseInt(document.getElementById("lblPageNo").value) + 1;
        GetCampaignCountDetailsData();
        waitingDialog.hide();
    });
});

function ClearAdvanceCampaignSearch() {
    document.getElementById("txtCampStudentName").value = "";
    document.getElementById("txtContactNumber").value = "";
    document.getElementById("txtCampStudentUID").value = "";
    //document.getElementById("txtXcenter").value = "";
    $("#ddlCenterSearch").val(0).change();
    document.getElementById("txtFromRank").value = "";
    document.getElementById("txtToRank").value = "";
    //document.getElementById("txtCampSchoolName").value = "";
    $("#ddlMTNMT").val('Select').change();
    $("#ddlInstitutionType").val(0).change();
    $("#ddlBoard").val(0).change();
    //        $("#ddlClassStandard option").remove();
    //        $("#ddlClassStandard").append($("<option></option>").val("0").html("Select"));
    $("#ddlSchoolName").val(0).change();
    $("#ddlExam").val(0).change();
    $("#ddlEvent").val(0).change();
    $("#ddlEventType option").remove();
    $("#ddlEventType").append($("<option></option>").val("0").html("Select"));
    $('#ddlEventType').selectpicker('refresh');
    $("#ddlAttendance").val(0).change();
    $("#ddlstatuslead").val(0).change();
    $("#ddlFeedbackHeader option").remove();
    $("#ddlFeedbackHeader").append($("<option></option>").val("0").html("Select"));
    $('#ddlFeedbackHeader').selectpicker('refresh');
    $("#ddlFeedbackValues option").remove();
    $("#ddlFeedbackValues").append($("<option></option>").val("0").html("Select"));
    $('#ddlFeedbackValues').selectpicker('refresh');
    $("#trAttendance").css('display', 'none');
    $("#trFeedbackHeader").css('display', 'none');
    $("#trFeedbackValues").css('display', 'none');



}

function CampaignEventTypeFill(objthis) {
    var CampaignId = document.getElementById("lblCampaignDetailcode").value
    var EventId = objthis;
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindCampaignEvents_Type",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"CampaignId":"' + CampaignId + '","EventId":"' + EventId + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlEventType").append($("<option></option>").val(item.Event_TypeID).html(item.Event_TypeDesc));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function CampaignEventFeedbackHeader() {
    var CampaignId = document.getElementById("lblCampaignDetailcode").value
    var EventId = document.getElementById("ddlEvent").value;
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindCampaignEvents_Header",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"CampaignId":"' + CampaignId + '","EventId":"' + EventId + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlFeedbackHeader").append($("<option></option>").val(item.Campaign_Event_Feedback_Id).html(item.Feedback_Header));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function CampaignEventFeedbackValues() {
    var CampaignId = document.getElementById("lblCampaignDetailcode").value
    var EventId = document.getElementById("ddlEvent").value;
    var FeedbackHeaderID = document.getElementById("ddlFeedbackHeader").value;
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindCampaignEvents_Header_Values",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"CampaignId":"' + CampaignId + '","EventId":"' + EventId + '","FeedbackHeaderId":"' + FeedbackHeaderID + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlFeedbackValues").append($("<option></option>").val(item.FeedbackValueId).html(item.FeedbackValue));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function ConvertToLead(objthis) {    //Convert to lead button click in grid
    controlVisiblity('ConvertToLead');
    var ConCode = $(objthis).attr('data');
    ViewStudentData(ConCode);
    document.getElementById("lblPKey").value = ConCode;
}

function ConvertToLead1(ConCode) {    //Convert to lead button click in grid
    controlVisiblity('ConvertToLead');
    ViewStudentData(ConCode);
    document.getElementById("lblPKey").value = ConCode;
}

function ConvertToOpportunity(objthis) {    //Convert to opportunity button click in grid
    controlVisiblity('ConvertToOpportunity');
    var LeadCode = $(objthis).attr('data');
    GetLeadDetailIntoCampaign(LeadCode);
    document.getElementById("lblPKey1").value = LeadCode;
}

function ConvertToOpportunity1(LeadCode) {    //Convert to opportunity button click in grid
    controlVisiblity('ConvertToOpportunity');
    GetLeadDetailIntoCampaign(LeadCode);
    document.getElementById("lblPKey1").value = LeadCode;
}

function BookAdmission(objthis) {    //Book Admission button click in grid
    controlVisiblity('BookAdmission');
    var OpportunityCode = $(objthis).attr('data');
    GetOpportunityDetailIntoCampaign(OpportunityCode);
    document.getElementById("lblOpportunityCode").value = OpportunityCode;
}

function BookAdmission1(OpportunityCode) {    //Book Admission button click in grid
    controlVisiblity('BookAdmission');
    GetOpportunityDetailIntoCampaign(OpportunityCode);
    document.getElementById("lblOpportunityCode").value = OpportunityCode;
}

function FollowUp(objthis) {    //Followup button click in grid
    var Recordcode = $(objthis).attr('data');
    ViewStudentDetail(Recordcode);
    document.getElementById("lblPKey3").value = Recordcode;
}

function ViewMoreContactDetail(objthis) {    //View More Contact Detail button click in grid
    var CampConCode = $(objthis).attr('data');
    ViewMoreContactsDetail(CampConCode);
    //alert('Hi');

    //    ViewStudentDetail(Recordcode);
    //    document.getElementById("lblPKey3").value = Recordcode;
}

function SubjectClick() { //Checkbox Click in Book Admission Div
    document.getElementById('lblSubject').innerHTML = "";
}

function Camapigndata(objthis) {
    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    var Campid = $(objthis).attr('data');
    ViewCampaignCountData(Campid);
    document.getElementById("lblCampaignDetailcode").value = Campid;
    $("#ddlCenterSearch option").remove();
    $("#ddlCenterSearch").append($("<option></option>").val("0").html("Select"));
    CenterFill_Search(Campid);
    $('#ddlCenterSearch').selectpicker('refresh');
    $("#ddlSchoolName option").remove();
    $("#ddlSchoolName").append($("<option></option>").val("0").html("Select"));
    SchoolCollege(Campid);
    $('#ddlSchoolName').selectpicker('refresh');
    $("#ddlEvent option").remove();
    $("#ddlEvent").append($("<option></option>").val("0").html("Select"));
    CampaignEvents(Campid);
    $('#ddlEvent').selectpicker('refresh');
    $("#ddlEventType option").remove();
    $("#ddlEventType").append($("<option></option>").val("0").html("Select"));
    $('#ddlEventType').selectpicker('refresh');
    $("#trAttendance").css('display', 'none');
    $("#trFeedbackHeader").css('display', 'none');
    $("#trFeedbackValues").css('display', 'none');
    waitingDialog.hide();
}

function controlVisiblity(mode) {
    //    if (mode == 'AssignedCampaign') {
    //        $("#AssignedCampaign").css('display', 'block');
    //        $("#AssignedCampaignDetail").css('display', 'none');
    //        $("#divCampaignSearch").css('display', 'none');
    //        $("#divCampaignData").css('display', 'none');
    //        $("#divConvertToLead").css('display', 'none');
    //        $("#divConvertToOpportunity").css('display', 'none');
    //        $("#divBookAdmission").css('display', 'none');
    //        $("#divFollowUp").css('display', 'none');
    //        $("#divAddmissionConfirmed").css('display', 'none');
    //        $("#divConvertAll").css('display', 'none');
    //        $("#Msg_Error").css('display', 'none');
    //        $("#Msg_Success").css('display', 'none');
    //    }
    if (mode == 'CampaignDetail') {
        // $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'block');
        $("#divCampaignCountSearch").css('display', 'none');
        $("#divCampaignSearch").css('display', 'none');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'CampaignCountSearch') {
        //$("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'block');
        $("#divCampaignData").css('display', 'block');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'Search') {
        // $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'block');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'Result') {
        // $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'block');
        $("#divCampaignData").css('display', 'block');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'ConvertToLead') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'none');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'block');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'ConvertToOpportunity') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'none');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'block');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'BookAdmission') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'none');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'block');
        $("#trProduct").css('display', 'none');
        $("#trFeeStructure").css('display', 'none');
        $("#divbtnSubmit").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'Save') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'block');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'Proceed') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'none');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'block');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'Back') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'none');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'block');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'FollowUp') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'none');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'block');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'ConvertToLeadOppAdmission') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'none');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'block');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
}

//Coding For Search Div Start
function CampaignFill() {    //To Bind Campaigns in Search div
    var UID = ReadCookie();
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindCampaign",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"UserId":"' + UID + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlCampaign").append($("<option></option>").val(item.CampaignId).html(item.Campaign_Name));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}
//Coding For Search Div End

//Coding For Campaign Page Start  
//var newCampaignIdArray = [];
//var newCampaignNameArray = [];

//function GetSpecificCampaign(Word) {  //Get Specific campaign
//    var SpecificCampaignIdArray = [];
//    var SpecificCampaignNameArray = [];
//    var j = 0;
//    if (Word == "") {
//        for (var i = 0; i < newCampaignNameArray.length; i++) {
//            SpecificCampaignIdArray[i] = newCampaignIdArray[i];
//            SpecificCampaignNameArray[i] = newCampaignNameArray[i];
//        }
//    }
//    else {
//        for (var i = 0; i < newCampaignNameArray.length; i++) {
//            var n = newCampaignNameArray[i].includes(Word);
//            if (n == true) {
//                SpecificCampaignIdArray[j] = newCampaignIdArray[i];
//                SpecificCampaignNameArray[j] = newCampaignNameArray[i];
//                j++;
//            }
//        }
//    }

//    j = 0;
//    $('#TCampaignAssigned').html('');
//    for (var i = 0; i < SpecificCampaignIdArray.length; i++) {
//        if (j == '0') {
//            $('#TCampaignAssigned').append('<tr>');
//        }
//        if (j == '0') {
//            $('#TCampaignAssigned').append('<td style="width:100%;"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="cursor: pointer" onclick="Camapigndata(this);" data="' + SpecificCampaignIdArray[i] + '"><div class="dashboard-stat blue" id="divstatblue" ><div class="visual"> <i class="icon-groupmine_empty"></i></div> <div class="details"><div class="desc"> <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' + SpecificCampaignNameArray[i] + '</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div></div></div></div></div> </td>');
//            j++;
//        }
//        else if (j == '1') {
//            $('#TCampaignAssigned').append('<td style="width:100%;"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="cursor: pointer" onclick="Camapigndata(this);" data="' + SpecificCampaignIdArray[i] + '"><div class="dashboard-stat purple" id="divstatpurple" ><div class="visual"> <i class="icon-groupmine_empty"></i></div> <div class="details"><div class="desc"> <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' + SpecificCampaignNameArray[i] + '</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div></div></div></div></div> </td>');
//            j++;
//        }
//        else if (j == '2') {
//            $('#TCampaignAssigned').append('<td style="width:100%; "><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="cursor: pointer" onclick="Camapigndata(this);" data="' + SpecificCampaignIdArray[i] + '"><div class="dashboard-stat pink2" id="divstatpink2" ><div class="visual"> <i class="icon-groupmine_empty"></i></div> <div class="details"><div class="desc"> <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' + SpecificCampaignNameArray[i] + '</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div></div></div></div></div> </td>');
//            j++;
//        }
//        else if (j == '3') {
//            $('#TCampaignAssigned').append('<td style="width:100%; "><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="cursor: pointer" onclick="Camapigndata(this);" data="' + SpecificCampaignIdArray[i] + '"><div class="dashboard-stat mint" id="divstatmint"><div class="visual"> <i class="icon-groupmine_empty"></i></div> <div class="details"><div class="desc"> <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' + SpecificCampaignNameArray[i] + '</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div></div></div></div></div> </td></tr>');
//            j = 0;
//        }
//    }

//}
// End of GetSpecificCampaign(Word)

function Assignedcampaign() {  //To fill grid on Campaign tile click
    waitingDialog.show('Please wait....', { dialogSize: 'sm', progressType: 'warning' });
    var UID = ReadCookie();
    var i = 0, j = 0;
    newCampaignIdArray = [];
    newCampaignNameArray = [];
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindCampaign",
        contentType: "application/json; charset=utf-8",
        data: '{"UserId":"' + UID + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $('#TCampaignAssigned').html('');
            $(data.d).each(function (index, obj) {
                newCampaignIdArray[j] = obj.CampaignId;
                newCampaignNameArray[j] = obj.Campaign_Name;
                j++;
                if (i == '0') {
                    $('#TCampaignAssigned').append('<tr>');
                }
                if (i == '0') {
                    $('#TCampaignAssigned').append('<td style="width:100%;"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="cursor: pointer" onclick="Camapigndata(this);" data="' + obj.CampaignId + '"><div class="dashboard-stat blue" id="divstatblue" ><div class="visual"> <i class="icon-groupmine_empty"></i></div> <div class="details"><div class="desc"> <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' + obj.Campaign_Name + '</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div></div></div></div></div> </td>');
                    i++;
                }
                else if (i == '1') {
                    $('#TCampaignAssigned').append('<td style="width:100%;"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="cursor: pointer" onclick="Camapigndata(this);" data="' + obj.CampaignId + '"><div class="dashboard-stat purple" id="divstatpurple" ><div class="visual"> <i class="icon-groupmine_empty"></i></div> <div class="details"><div class="desc"> <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' + obj.Campaign_Name + '</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div></div></div></div></div> </td>');
                    i++;
                }
                else if (i == '2') {
                    $('#TCampaignAssigned').append('<td style="width:100%; "><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="cursor: pointer" onclick="Camapigndata(this);" data="' + obj.CampaignId + '"><div class="dashboard-stat pink2" id="divstatpink2" ><div class="visual"> <i class="icon-groupmine_empty"></i></div> <div class="details"><div class="desc"> <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' + obj.Campaign_Name + '</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div></div></div></div></div> </td>');
                    i++;
                }
                else if (i == '3') {
                    $('#TCampaignAssigned').append('<td style="width:100%; "><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="cursor: pointer" onclick="Camapigndata(this);" data="' + obj.CampaignId + '"><div class="dashboard-stat mint" id="divstatmint"><div class="visual"> <i class="icon-groupmine_empty"></i></div> <div class="details"><div class="desc"> <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' + obj.Campaign_Name + '</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div></div></div></div></div> </td></tr>');
                    i = 0;
                }

            })
            if (data.d == '') {
                waitingDialog.hide();
            }
            else {
                controlVisiblity('AssignedCampaign');
                waitingDialog.hide();
            }
            document.getElementById("lblCampaignCount").value = j.toString();
        }),
        error: (function () {
            toastr.error('Something Gone Wrong....');
            waitingDialog.hide();
        })

    });
};

function ViewCampaignCountData(Campid) {   //To view Campaign Count
    var UID = ReadCookie();
    //    document.getElementById('lblCamapignname').innerHTML = "";
    //    document.getElementById('lblCount').innerHTML = "";
    //    //    document.getElementById('lblPendingContacts').innerHTML = "";
    //    document.getElementById('lblCalledbutnotConvertedtoLead').innerHTML = "";
    document.getElementById('lblAvailableLeads').innerHTML = "";
    //    document.getElementById('lblAvailableOpportunity').innerHTML = "";
    //    document.getElementById('lblAccount').innerHTML = "";
    //    document.getElementById('lblLostCount').innerHTML = "";
    //    document.getElementById('lblTotalFollowupDoneTillDate').innerHTML = "";
    //    document.getElementById('lblTodayFollowup').innerHTML = "";
    //    document.getElementById('lblOverdueFollowup').innerHTML = "";
    //    //    document.getElementById('lblYesterdayFollowup').innerHTML = "";
    //    document.getElementById('lblNext7days').innerHTML = "";
    //    document.getElementById('lblPrev7days').innerHTML = "";
    //    document.getElementById('lblUnAttemptedContacts').innerHTML = "";
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindCampaign",
        contentType: "application/json; charset=utf-8",
        data: '{"CampaignId":"' + Campid + '","userId":"' + UID + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                //                document.getElementById('lblCamapignname').innerHTML = obj.Camp_Name + " Campaign Summary";
                //                document.getElementById('lblCamapignname2').innerHTML = obj.Camp_Name + " Campaign Followup Summary";
                //                document.getElementById('lblCount').innerHTML = obj.TotalCampaignContacts;
                document.getElementById('lblAvailableLeads').innerHTML = obj.Campaign_Name;
                //                document.getElementById('lblAvailableOpportunity').innerHTML = obj.AvailableOpportunity;
                //                document.getElementById('lblAccount').innerHTML = obj.Account;
                //                //document.getElementById('lblPendingContacts').innerHTML = obj.PendingContacts;                
                //                document.getElementById('lblCalledbutnotConvertedtoLead').innerHTML = obj.CalledbutnotConvertedtoLead;
                //                document.getElementById('lblLostCount').innerHTML = obj.LostContacts;
                //                document.getElementById('lblTotalFollowupDoneTillDate').innerHTML = obj.TotalFollowupDoneTillDate;
                //                document.getElementById('lblTodayFollowup').innerHTML = obj.TodaysFollowup;
                //                document.getElementById('lblOverdueFollowup').innerHTML = obj.OverDueFollowup;
                //                //                document.getElementById('lblYesterdayFollowup').innerHTML = obj.YesterdaysPendingFollowup;
                //                document.getElementById('lblNext7days').innerHTML = obj.Next7DaysFollowup;
                //                document.getElementById('lblPrev7days').innerHTML = obj.Prev7DaysFollowup;
                //                document.getElementById('lblLast50touchfollowup').innerHTML = obj.Last50touchfollowupFollowup;
                //                document.getElementById('lblUnAttemptedContacts').innerHTML = obj.UnattemptedContacts;
                controlVisiblity('CampaignDetail');
            });
            if (data.d == '') {
            }
            else {
            }
        }),
        error: (function () {
            toastr.error('Something Gone Wrong....');
        })
    });
};

function GetCampaignCountDetailsData() {      //To Bind Result Grid On Campaign Count Lable click
    var UID = ReadCookie();
    var lableflag = document.getElementById("lblCamapignflag").value;
    var PageNo = document.getElementById("lblPageNo").value;
    var campaignid = document.getElementById("lblCampaignDetailcode").value;
    var CampstudentName = document.getElementById("txtCampStudentName").value;
    var CampSchoolName = ""; //document.getElementById("txtCampSchoolName").value;
    var CampMTNMT = document.getElementById("ddlMTNMT").value;
    var CampCenter = document.getElementById("ddlCenterSearch").value;
    //var BoardName = document.getElementById("txtBoard").value;
    var ContactNo = document.getElementById("txtContactNumber").value;
    var CampStudentUID = document.getElementById("txtCampStudentUID").value;
    var InstitutionType = document.getElementById("ddlInstitutionType").value;
    var BoardId = document.getElementById("ddlBoard").value;
    var Standard = document.getElementById("ddlClassStandard").value;
    var School = document.getElementById("ddlSchoolName").value;
    var Exam = document.getElementById("ddlExam").value;
    var ExamStatus = document.getElementById("ddlExamStatus").value;
    var ExamRankFrom = document.getElementById("txtFromRank").value;
    var ExamRankTo = document.getElementById("txtToRank").value;
    var EventId = document.getElementById("ddlEvent").value;
    var Attendance = document.getElementById("ddlAttendance").value;
    var Event_FeedbackHeader_Id = document.getElementById("ddlFeedbackHeader").value;
    var Event_Feedback_Value_Id = document.getElementById("ddlFeedbackValues").value;
    var Followupstatus_Id = document.getElementById("ddlstatuslead").value;

    if (CampMTNMT == 'Select') {
        CampMTNMT = '';
    }
    console.debug('CampaignId - ' + campaignid + ' flag - ' + parseInt(lableflag) + ' UID- ' + UID + ' PageNo - ' + PageNo);

    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/GET_CONTACT_COUNT_DETAILS_BY_CAMPAIGN_ID",
        contentType: "application/json; charset=utf-8",
        data: '{"Flag":"' + parseInt(lableflag) + '","CampaignId":"' + campaignid + '","UID":"' + UID + '","StudentName":"' + CampstudentName + '","InstitutionType":"' + InstitutionType + '","CategoryType": "' + CampMTNMT + '","Centername":"' + CampCenter + '","PageNo":"' + parseInt(PageNo) + '","ContactNo":"' + ContactNo + '","Standard_Id":"' + Standard + '","School_Id":"' + School + '","Exam_Id":"' + Exam + '","Exam_Status_Id":"' + ExamStatus + '","Exam_From_Rank":"' + ExamRankFrom + '","Exam_To_Rank":"' + ExamRankTo + '","EventId":"' + EventId + '","Attendance":"' + Attendance + '","Event_FeedbackHeader_Id":"' + Event_FeedbackHeader_Id + '","Event_Feedback_Value_Id":"' + Event_Feedback_Value_Id + '","CampStudentUID":"' + CampStudentUID + '","Board_Id":"' + BoardId + '","Followupstatus":"' + Followupstatus_Id + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $('#TCampaign').html('');
            $(data.d).each(function (index, obj) {
                if (obj.LeadFlag == '0') {
                    $('#TCampaign').append('<tr style="padding-right: 25px"><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><a id="ConvertToLead" onclick="ConvertToLead(this);" data="' + obj.ConAndCampaignid + '"  class="btn red"><i class="fa fa-leaf" data-toggle="tooltip"  data-placement="bottom" title="Convert To Lead"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr style="padding-right: 25px"><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Enrollment No./UID- </b>' + obj.Con_Id + '</br><b>Mobile No.- </b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/ Outsider- </b>' + obj.CategoryType + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Board Name- </b>' + obj.BoardName + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><b>Current Status- </b><label id="lblCurrentStatus" style="color: Red;">Campaign</label></br><a id="ConvertToLead" onclick="ConvertToLead(this);" data="' + obj.ConAndCampaignid + '"  class="btn red"><i class="fa fa-leaf" data-toggle="tooltip"  data-placement="bottom" title="Convert To Lead"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr style="padding-right: 25px"><td style="width:25%;">' + obj.Student_Name + '</td><td style="width:50%;"><b>School Name-</b> ' + obj.inst_desc + '</br><b>Enrollment No./UID-</b> ' + obj.Con_Id + '</br><b>Mobile No.-</b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/Outsider-</b>' + obj.CategoryType + '</br><b>Center Name-</b>' + obj.Centername + '</br><b>Board Name-</b>' + obj.BoardName + '</br><b>Last followup Date-</b>' + obj.LastFollowDate + '</br><b>Last Remark-</b>' + obj.LastRemark + '</br><b>Current Status-</b><label id="lblCurrentStatus" style="color: Red;">Campaign</label></td><td style="width:25%;"><a id="ConvertToLead" onclick="ConvertToLead(this);" data="' + obj.ConAndCampaignid + '"  class="btn red"><i class="fa fa-leaf" data-toggle="tooltip"  data-placement="bottom" title="Convert To Lead"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a></td></tr>');
                }
                else if (obj.opportunityFlag == '0') {
                    $('#TCampaign').append('<tr style="padding-right: 25px"><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><a id="ConvertToOpportunity" onclick="ConvertToOpportunity(this);" data="' + obj.Lead_Code + '" class="btn blue"><i class="fa fa-tag" data-toggle="tooltip"  data-placement="bottom" title="Convert To Opportunity"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr style="padding-right: 25px"><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Enrollment No./UID- </b>' + obj.Con_Id + '</br><b>Mobile No.- </b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/ Outsider- </b>' + obj.CategoryType + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Board Name- </b>' + obj.BoardName + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><b>Current Status- </b><label id="lblCurrentStatus" style="color: Red;">Lead</label></br><a id="ConvertToOpportunity" onclick="ConvertToOpportunity(this);" data="' + obj.Lead_Code + '" class="btn blue"><i class="fa fa-tag" data-toggle="tooltip"  data-placement="bottom" title="Convert To Opportunity"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //                    $('#TCampaign').append('<tr style="padding-right: 25px"><td style="width:25%;">' + obj.Student_Name + '</td><td style="width:50%;"><b>School Name-</b> ' + obj.inst_desc + '</br><b>Enrollment No./UID-</b> ' + obj.Con_Id + '</br><b>Mobile No.-</b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/Outsider-</b>' + obj.CategoryType + '</br><b>Center Name-</b>' + obj.Centername + '</br><b>Board Name-</b>' + obj.BoardName + '</br><b>Last followup Date-</b>' + obj.LastFollowDate + '</br><b>Last Remark-</b>' + obj.LastRemark + '</br><b>Current Status-</b><label id="lblCurrentStatus" style="color: Red;">Lead</label></td><td style="width:25%;"><a id="ConvertToOpportunity" onclick="ConvertToOpportunity(this);" data="' + obj.Lead_Code + '" class="btn blue"><i class="fa fa-tag" data-toggle="tooltip"  data-placement="bottom" title="Convert To Opportunity"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a></td></tr>');
                }
                else if (obj.AdmissionFlag == '0') {
                    $('#TCampaign').append('<tr style="padding-right: 25px"><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><a id="ConvertToAdmission" onclick="BookAdmission(this);" data="' + obj.Opportunity_Code + '" class="btn purple"><i class="glyphicon glyphicon-lock" data-toggle="tooltip"  data-placement="bottom" title="Book Admission"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr style="padding-right: 25px"><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Enrollment No./UID- </b>' + obj.Con_Id + '</br><b>Mobile No.- </b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/ Outsider- </b>' + obj.CategoryType + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Board Name- </b>' + obj.BoardName + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><b>Current Status- </b><label id="lblCurrentStatus" style="color: Red;">Opportunity</label></br><a id="ConvertToAdmission" onclick="BookAdmission(this);" data="' + obj.Opportunity_Code + '" class="btn purple"><i class="glyphicon glyphicon-lock" data-toggle="tooltip"  data-placement="bottom" title="Book Admission"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //                    $('#TCampaign').append('<tr style="padding-right: 25px"><td style="width:25%;"><b>Name-</b>' + obj.Student_Name + '</td><td style="width:50%;"><b>School Name-</b> ' + obj.inst_desc + '</br><b>Enrollment No./UID-</b> ' + obj.Con_Id + '</br><b>Mobile No.-</b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/Outsider-</b>' + obj.CategoryType + '</br><b>Center Name-</b>' + obj.Centername + '</br><b>Board Name-</b>' + obj.BoardName + '</br><b>Last followup Date-</b>' + obj.LastFollowDate + '</br><b>Last Remark-</b>' + obj.LastRemark + '</br><b>Current Status-</b><label id="lblCurrentStatus" style="color: Red;">Opportunity</label></td><td style="width:25%;"><a id="ConvertToAdmission" onclick="BookAdmission(this);" data="' + obj.Opportunity_Code + '" class="btn purple"><i class="glyphicon glyphicon-lock" data-toggle="tooltip"  data-placement="bottom" title="Book Admission"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a></td></tr>');
                }
                else {
                    $('#TCampaign').append('<tr style="padding-right: 25px"><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr style="padding-right: 25px"><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Enrollment No./UID- </b>' + obj.Con_Id + '</br><b>Mobile No.- </b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/ Outsider- </b>' + obj.CategoryType + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Board Name- </b>' + obj.BoardName + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><b>Current Status- </b><label id="lblCurrentStatus" style="color: Red;">Admission</label></br><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //                    $('#TCampaign').append('<tr style="padding-right: 25px"><td style="width:25%;">' + obj.Student_Name + '</td><td style="width:50%;"><b>School Name-</b> ' + obj.inst_desc + '</br><b>Enrollment No./UID-</b> ' + obj.Con_Id + '</br><b>Mobile No.-</b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/Outsider-</b>' + obj.CategoryType + '</br><b>Center Name-</b>' + obj.Centername + '</br><b>Board Name-</b>' + obj.BoardName + '</br><b>Last followup Date-</b>' + obj.LastFollowDate + '</br><b>Last Remark-</b>' + obj.LastRemark + '</br><b>Current Status-</b><label id="lblCurrentStatus" style="color: Red;">Admission</label></td><td style="width:25%;"><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a></td></tr>');
                }

                if (obj.PrevButtonFlag == '1') {
                    $("#divPrevButton").css('display', 'block');
                }
                else {
                    $("#divPrevButton").css('display', 'none');
                }

                if (obj.NextButtonFlag == '1') {
                    $("#divnextButton").css('display', 'block');
                }
                else {
                    $("#divnextButton").css('display', 'none');
                }
                document.getElementById('lblShowingInfo').innerHTML = obj.ShowingInfo;
            })
            if (data.d == '') {
                controlVisiblity('CampaignDetail');
                toastr.error('No Record Found!');
                document.getElementById("lblShowingInfo").innerHTML = "";
            }
            else {
                controlVisiblity('CampaignCountSearch');
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
        })
    });
};

function GetCampaignCountDetailsSearchData() {      //To Bind Result Grid On Campaign Count Search click
    waitingDialog.show('Please wait while the data is getting populated', { dialogSize: 'sm', progressType: 'warning' });
    var UID = ReadCookie();
    var PageNo = document.getElementById("lblPageNo").value;
    var lableflag = document.getElementById("lblCamapignflag").value;
    var campaignid = document.getElementById("lblCampaignDetailcode").value;
    var CampstudentName = document.getElementById("txtCampStudentName").value;
    var CampSchoolName = ""; //document.getElementById("txtCampSchoolName").value;
    var CampMTNMT = document.getElementById("ddlMTNMT").value;
    var CampCenter = document.getElementById("ddlCenterSearch").value;
    //var BoardName = document.getElementById("txtBoard").value;
    var ContactNo = document.getElementById("txtContactNumber").value;
    var CampStudentUID = document.getElementById("txtCampStudentUID").value;
    var InstitutionType = document.getElementById("ddlInstitutionType").value;
    var BoardId = document.getElementById("ddlBoard").value;
    var Standard = document.getElementById("ddlClassStandard").value;
    var School = document.getElementById("ddlSchoolName").value;
    var Exam = document.getElementById("ddlExam").value;
    var ExamStatus = document.getElementById("ddlExamStatus").value;
    var ExamRankFrom = document.getElementById("txtFromRank").value;
    var ExamRankTo = document.getElementById("txtToRank").value;
    var EventId = document.getElementById("ddlEvent").value;
    var Attendance = document.getElementById("ddlAttendance").value;
    var Event_FeedbackHeader_Id = document.getElementById("ddlFeedbackHeader").value;
    var Event_Feedback_Value_Id = document.getElementById("ddlFeedbackValues").value;
    var Followupstatus_id = document.getElementById("ddlstatuslead").value;

    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/GET_CONTACT_COUNT_DETAILS_BY_CAMPAIGN_ID",
        contentType: "application/json; charset=utf-8",
        data: '{"Flag":"' + parseInt(lableflag) + '","CampaignId":"' + campaignid + '","UID":"' + UID + '","StudentName":"' + CampstudentName + '","InstitutionType":"' + InstitutionType + '","CategoryType": "' + CampMTNMT + '","Centername":"' + CampCenter + '","PageNo":"' + parseInt(PageNo) + '","ContactNo":"' + ContactNo + '","Standard_Id":"' + Standard + '","School_Id":"' + School + '","Exam_Id":"' + Exam + '","Exam_Status_Id":"' + ExamStatus + '","Exam_From_Rank":"' + ExamRankFrom + '","Exam_To_Rank":"' + ExamRankTo + '","EventId":"' + EventId + '","Attendance":"' + Attendance + '","Event_FeedbackHeader_Id":"' + Event_FeedbackHeader_Id + '","Event_Feedback_Value_Id":"' + Event_Feedback_Value_Id + '","CampStudentUID":"' + CampStudentUID + '","Board_Id":"' + BoardId + '","Followupstatus":"' + Followupstatus_id + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $('#TCampaign').html('');
            $(data.d).each(function (index, obj) {
                if (obj.LeadFlag == '0') {
                    $('#TCampaign').append('<tr><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><a id="ConvertToLead" onclick="ConvertToLead(this);" data="' + obj.ConAndCampaignid + '"  class="btn red"><i class="fa fa-leaf" data-toggle="tooltip"  data-placement="bottom" title="Convert To Lead"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Enrollment No./UID- </b>' + obj.Con_Id + '</br><b>Mobile No.- </b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/ Outsider- </b>' + obj.CategoryType + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Board Name- </b>' + obj.BoardName + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><b>Current Status- </b><label id="lblCurrentStatus" style="color: Red;">Campaign</label></br><a id="ConvertToLead" onclick="ConvertToLead(this);" data="' + obj.ConAndCampaignid + '"  class="btn red"><i class="fa fa-leaf" data-toggle="tooltip"  data-placement="bottom" title="Convert To Lead"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //                    $('#TCampaign').append('<tr><td style="width:25%;">' + obj.Student_Name + '</td><td style="width:50%;"><b>School Name-</b> ' + obj.inst_desc + '</br><b>Enrollment No./UID-</b> ' + obj.Con_Id + '</br><b>Mobile No.-</b>' + obj.Handphone1 + '</br><b>MT/NMT-</b>' + obj.CategoryType + '</br><b>Center Name-</b>' + obj.Centername + '</br><b>Board Name-</b>' + obj.BoardName + '</br><b>Last followup Date-</b>' + obj.LastFollowDate + '</br><b>Last Remark-</b>' + obj.LastRemark + '</br><b>Current Status-</b><label id="lblCurrentStatus" style="color: Red;">Campaign</label></td><td style="width:25%;"><a id="ConvertToLead" onclick="ConvertToLead(this);" data="' + obj.ConAndCampaignid + '"  class="btn red"><i class="fa fa-leaf" data-toggle="tooltip"  data-placement="bottom" title="Convert To Lead"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a></td></tr>');
                }
                else if (obj.opportunityFlag == '0') {
                    $('#TCampaign').append('<tr><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><a id="ConvertToOpportunity" onclick="ConvertToOpportunity(this);" data="' + obj.Lead_Code + '" class="btn blue"><i class="fa fa-tag" data-toggle="tooltip"  data-placement="bottom" title="Convert To Opportunity"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Enrollment No./UID- </b>' + obj.Con_Id + '</br><b>Mobile No.- </b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/ Outsider- </b>' + obj.CategoryType + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Board Name- </b>' + obj.BoardName + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><b>Current Status- </b><label id="lblCurrentStatus" style="color: Red;">Lead</label></br><a id="ConvertToOpportunity" onclick="ConvertToOpportunity(this);" data="' + obj.Lead_Code + '" class="btn blue"><i class="fa fa-tag" data-toggle="tooltip"  data-placement="bottom" title="Convert To Opportunity"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //                    $('#TCampaign').append('<tr><td style="width:25%;">' + obj.Student_Name + '</td><td style="width:50%;"><b>School Name-</b> ' + obj.inst_desc + '</br><b>Enrollment No./UID-</b> ' + obj.Con_Id + '</br><b>Mobile No.-</b>' + obj.Handphone1 + '</br><b>MT/NMT-</b>' + obj.CategoryType + '</br><b>Center Name-</b>' + obj.Centername + '</br><b>Board Name-</b>' + obj.BoardName + '</br><b>Last followup Date-</b>' + obj.LastFollowDate + '</br><b>Last Remark-</b>' + obj.LastRemark + '</br><b>Current Status-</b><label id="lblCurrentStatus" style="color: Red;">Lead</label></td><td style="width:25%;"><a id="ConvertToOpportunity" onclick="ConvertToOpportunity(this);" data="' + obj.Lead_Code + '" class="btn blue"><i class="fa fa-tag" data-toggle="tooltip"  data-placement="bottom" title="Convert To Opportunity"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a></td></tr>');
                }
                else if (obj.AdmissionFlag == '0') {
                    $('#TCampaign').append('<tr><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b> ' + obj.inst_desc + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><a id="ConvertToAdmission" onclick="BookAdmission(this);" data="' + obj.Opportunity_Code + '" class="btn purple"><i class="glyphicon glyphicon-lock" data-toggle="tooltip"  data-placement="bottom" title="Book Admission"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b> ' + obj.inst_desc + '</br><b>Enrollment No./UID- </b>' + obj.Con_Id + '</br><b>Mobile No.- </b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/ Outsider- </b>' + obj.CategoryType + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Board Name- </b>' + obj.BoardName + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><b>Current Status- </b><label id="lblCurrentStatus" style="color: Red;">Opportunity</label></br><a id="ConvertToAdmission" onclick="BookAdmission(this);" data="' + obj.Opportunity_Code + '" class="btn purple"><i class="glyphicon glyphicon-lock" data-toggle="tooltip"  data-placement="bottom" title="Book Admission"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //                    $('#TCampaign').append('<tr><td style="width:25%;">' + obj.Student_Name + '</td><td style="width:50%;"><b>School Name-</b> ' + obj.inst_desc + '</br><b>Enrollment No./UID-</b> ' + obj.Con_Id + '</br><b>Mobile No.-</b>' + obj.Handphone1 + '</br><b>MT/NMT-</b>' + obj.CategoryType + '</br><b>Center Name-</b>' + obj.Centername + '</br><b>Board Name-</b>' + obj.BoardName + '</br><b>Last followup Date-</b>' + obj.LastFollowDate + '</br><b>Last Remark-</b>' + obj.LastRemark + '</br><b>Current Status-</b><label id="lblCurrentStatus" style="color: Red;">Opportunity</label></td><td style="width:25%;"><a id="ConvertToAdmission" onclick="BookAdmission(this);" data="' + obj.Opportunity_Code + '" class="btn purple"><i class="glyphicon glyphicon-lock" data-toggle="tooltip"  data-placement="bottom" title="Book Admission"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a></td></tr>');
                }
                else {
                    $('#TCampaign').append('<tr><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Enrollment No./UID- </b>' + obj.Con_Id + '</br><b>Mobile No.- </b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/ Outsider- </b>' + obj.CategoryType + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Board Name- </b>' + obj.BoardName + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><b>Current Status- </b><label id="lblCurrentStatus" style="color: Red;">Admission</label></br><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //                    $('#TCampaign').append('<tr><td style="width:25%;">' + obj.Student_Name + '</td><td style="width:50%;"><b>School Name-</b> ' + obj.inst_desc + '</br><b>Enrollment No./UID-</b> ' + obj.Con_Id + '</br><b>Mobile No.-</b>' + obj.Handphone1 + '</br><b>MT/NMT-</b>' + obj.CategoryType + '</br><b>Center Name-</b>' + obj.Centername + '</br><b>Board Name-</b>' + obj.BoardName + '</br><b>Last followup Date-</b>' + obj.LastFollowDate + '</br><b>Last Remark-</b>' + obj.LastRemark + '</br><b>Current Status-</b><label id="lblCurrentStatus" style="color: Red;">Admission</label></td><td style="width:25%;"><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a></td></tr>');
                }

                document.getElementById('lblShowingInfo').innerHTML = obj.ShowingInfo;

                if (obj.PrevButtonFlag == '1') {
                    $("#divPrevButton").css('display', 'block');
                }
                else {
                    $("#divPrevButton").css('display', 'none');
                }

                if (obj.NextButtonFlag == '1') {
                    $("#divnextButton").css('display', 'block');
                }
                else {
                    $("#divnextButton").css('display', 'none');
                }

            })
            if (data.d == '') {
                controlVisiblity('CampaignCountSearch');
                toastr.error('No Record Found!');
                document.getElementById("lblShowingInfo").innerHTML = "";
                waitingDialog.hide();
            }
            else {
                waitingDialog.hide();
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            waitingDialog.hide();
        })
    });
};
//Coding For Campaign Page End

//Coding For convert To Lead Div Start
function CampaignOverdueFill() {
    waitingDialog.show('Please wait while the data is getting populated', { dialogSize: 'sm', progressType: 'warning' });
    ClearAdvanceCampaignSearch();
    document.getElementById("lblCamapignflag").value = 15;
    document.getElementById("lblPageNo").value = 1;
    GetCampaignCountDetailsData();
    waitingDialog.hide();
}


function AcadYearFill() {   //To Bind Acad Year in Convert To Lead div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindAcadYear",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlAcadYear").append($("<option></option>").val(item.AcadYearId).html(item.AcadYearDesc));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function CenterFill_Search(Campaign_Id) {    //To Bind Center in Last Admission for student
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindoldAdmissionCenter",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"CampaignId":"' + Campaign_Id + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlCenterSearch").append($("<option></option>").val(item.Center_code).html(item.Center_name));
            })
            $('#ddlCenterSearch').selectpicker('refresh');
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}


//Bind Institution Type
function InstitutionType() {   //To Bind Institution Type
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindInstitutionType",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlInstitutionType").append($("<option></option>").val(item.InstitutionTypeId).html(item.InstitutionTypeDesc));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

//Bind Board
function Board() {   //To Bind Board
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindBoard",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlBoard").append($("<option></option>").val(item.BoardId).html(item.BoardDesc));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}


//Bind School/College
function SchoolCollege(CampaignId) {   //To Bind School/College
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindSchoolCollege",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"CampaignId":"' + CampaignId + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlSchoolName").append($("<option></option>").val(item.School_ID).html(item.School_Name));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

//Bind Campaign Events
function CampaignEvents(CampaignId) {   //To Bind Campaign Events
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindCampaignEvents",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"CampaignId":"' + CampaignId + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlEvent").append($("<option></option>").val(item.Event_ID).html(item.Event_Name));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}


//Bind Exam Name
function FillExamName() {   //To Bind ExamName
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindExamName",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlExam").append($("<option></option>").val(item.Exam_ID).html(item.Exam_Description));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function DivisionFill() {    //To Bind Division in Convert To Lead div
    var UID = ReadCookie();
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindDivision",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"UserId":"' + UID + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlDivision").append($("<option></option>").val(item.Source_Division_Code).html(item.Source_Division_ShortDesc));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function StandardFill(Institution_Type) {    //To Bind Center in Convert To Lead div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindStandard",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"InstitutionType":"' + Institution_Type + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlClassStandard").append($("<option></option>").val(item.Standard_code).html(item.Standard_name));
            })
            $('#ddlClassStandard').selectpicker('refresh');
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function ExamStatusFill(ExamId) {    //To Bind Exam Status
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindExamStatus",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"ExamId":"' + ExamId + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlExamStatus").append($("<option></option>").val(item.Exam_Status_Id).html(item.Exam_Status_Description));
            })
            $('#ddlExamStatus').selectpicker('refresh');
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function CenterFill(Division) {    //To Bind Center in Convert To Lead div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindCenter",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"Division":"' + Division + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlCenter").append($("<option></option>").val(item.center_code).html(item.center_name));
            })
            $('#ddlCenter').selectpicker('refresh');
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function ViewStudentData(concode) {   //To view Student Details On convert To Lead Click
    $("#ddlAcadYear").val(0).change();
    $("#ddlDivision").val(0).change();
    $("#ddlCenter").val(0).change();
    document.getElementById('lblAcadYear').innerHTML = "";
    document.getElementById('lblDivision').innerHTML = "";
    document.getElementById('lblCenter').innerHTML = "";
    $('[data-id="ddlAcadYear"]').removeClass('errorClass');
    $('[data-id="ddlDivision"]').removeClass('errorClass');
    $('[data-id="ddlCenter"]').removeClass('errorClass');
    $('[data-id="ddlAcadYear"]').removeClass('sucessClass');
    $('[data-id="ddlDivision"]').removeClass('sucessClass');
    $('[data-id="ddlCenter"]').removeClass('sucessClass');
    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/ViewContactDetail",
        contentType: "application/json; charset=utf-8",
        data: '{"ConId":"' + concode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                document.getElementById('lblStudentName').innerHTML = obj.StudentName;
                document.getElementById('lblEmailId').innerHTML = obj.Emailid;
                document.getElementById('lblGender').innerHTML = obj.Gender;
                document.getElementById('lblMobileNo1').innerHTML = obj.Handphone1;
                document.getElementById('lblCampaign').innerHTML = obj.Campaign;
            })

            if (data.d == '') {
                waitingDialog.hide();
            }
            else {
                waitingDialog.hide();
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            waitingDialog.hide();
        })
    });
};

function ViewMoreContactsDetail(concode) {   //To view More Contacts Details On More Contact Details Click    
    document.getElementById('lblStudentName1').innerHTML = "";
    document.getElementById('lblStudentEnrollmentNoUID1').innerHTML = "";
    document.getElementById('lblBoardName1').innerHTML = "";
    document.getElementById('lblInHouseOutsider1').innerHTML = "";
    document.getElementById('lblStudentHandphone1').innerHTML = "";
    document.getElementById('lblStudentHandphone2').innerHTML = "";
    document.getElementById('lblFatherName1').innerHTML = "";
    document.getElementById('lblFatherHandphone1').innerHTML = "";
    document.getElementById('lblFatherHandphone2').innerHTML = "";
    document.getElementById('lblRCOMarks1').innerHTML = "";
    document.getElementById('lblRank1').innerHTML = "";
    document.getElementById('lblNextFollowupDate1').innerHTML = "";
    document.getElementById('lblCurrentStatus1').innerHTML = "";
    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/ViewMoreContactDetails",
        contentType: "application/json; charset=utf-8",
        data: '{"ConId":"' + concode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                document.getElementById('lblStudentName1').innerHTML = obj.StudentName;
                document.getElementById('lblStudentEnrollmentNoUID1').innerHTML = obj.Seminar_UID_No;
                document.getElementById('lblBoardName1').innerHTML = obj.BoardName;
                document.getElementById('lblInHouseOutsider1').innerHTML = obj.Category_Type;
                document.getElementById('lblFatherName1').innerHTML = obj.FatherName;
                //document.getElementById('lblStudentHandphone1').innerHTML = obj.Handphone1;
                document.getElementById('lblRCOMarks1').innerHTML = obj.RCO_Marks;
                document.getElementById('lblRank1').innerHTML = obj.Exam_Rank;
                document.getElementById('lblNextFollowupDate1').innerHTML = obj.NextFollowupDate;
                document.getElementById('lblCurrentStatus1').innerHTML = obj.CurrentStatus;

                if (obj.Handphone1 != '') {
                    document.getElementById('lblStudentHandphone1').innerHTML = obj.Handphone1 + "<a id='aStudentHandphone1' href='tel:' " + obj.Handphone1 + "''><img src='Images/MobileCall.png' width='25px' /></a>";
                }
                if (obj.Handphone2 != '') {
                    document.getElementById('lblStudentHandphone2').innerHTML = obj.Handphone2 + "<a id='aStudentHandphone2' href='tel:' " + obj.Handphone2 + "''><img src='Images/MobileCall.png' width='25px' /></a>";
                }
                //document.getElementById('lblStudentHandphone2').innerHTML = obj.Handphone2;
                if (obj.FatherHandphone1 != '') {
                    document.getElementById('lblFatherHandphone1').innerHTML = obj.FatherHandphone1 + "<a id='aFatherHandphone1' href='tel:' " + obj.FatherHandphone1 + "''><img src='Images/MobileCall.png' width='25px' /></a>";
                }
                //document.getElementById('lblFatherHandphone1').innerHTML = obj.FatherHandphone1;
                if (obj.FatherHandphone2 != '') {
                    document.getElementById('lblFatherHandphone2').innerHTML = obj.FatherHandphone2 + "<a id='aFatherHandphone2' href='tel:' " + obj.FatherHandphone2 + "''><img src='Images/MobileCall.png' width='25px' /></a>";
                }
                //document.getElementById('lblFatherHandphone2').innerHTML = obj.FatherHandphone2;
                $('#form_modal11').modal({
                    keyboard: true,
                    backdrop: "static"
                });

            })

            if (data.d == '') {
                waitingDialog.hide();
            }
            else {
                waitingDialog.hide();
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            waitingDialog.hide();
        })
    });
};

function SaveConvertContactToLeadData(AcadYear, Division, Center) {    //To save Data In Convert To Lead Div   
    var earray = document.getElementById("lblPKey").value;
    var carreay = earray.split('%');
    var conid = carreay[0];
    var campaignid = carreay[1];
    var errormsg = "";
    var UID = ReadCookie();
    var v = "0";

    if (AcadYear == "0") {
        document.getElementById('lblAcadYear').innerHTML = "Select Acad Year";
        $('[data-id="ddlAcadYear"]').addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblAcadYear').innerHTML = "";
        $('[data-id="ddlAcadYear"]').addClass('sucessClass');
    }

    if (Division == "0") {
        document.getElementById('lblDivision').innerHTML = "Select Division";
        $('[data-id="ddlDivision"]').addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblDivision').innerHTML = "";
        $('[data-id="ddlDivision"]').addClass('sucessClass');
    }

    if (Center == "0") {
        document.getElementById('lblCenter').innerHTML = "Select Center";
        $('[data-id="ddlCenter"]').addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblCenter').innerHTML = "";
        $('[data-id="ddlCenter"]').addClass('sucessClass');
    }
    if (v == "1") {
        return false;
    }

    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/LeadSaveDetail",
        contentType: "application/json; charset=utf-8",
        data: '{"Lead_campgn_id":"' + campaignid + '","Lead_Con_id":"' + conid + '", "Contact_Assignto":"' + UID + '", "Createdby":"' + UID + '", "Division":"' + Division + '", "Center":"' + Center + '", "AcadYear":"' + AcadYear + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                // LeadId = obj.LeadId;
                if (obj.result == "1") {

                    document.getElementById("lblCampaign_Contact_Code").value = conid + '%' + campaignid;
                    document.getElementById('lblLead_Code').value = obj.LeadId;
                    document.getElementById('lblOpportunity_Code').value = 'Blank';
                    document.getElementById('lblAccount_Id').value = 'Blank';
                    //if Opportunity is not created then Opportunity creation Confirmation                    
                    document.getElementById('lblConvertHeader').innerHTML = 'Convert To Opportunity';
                    document.getElementById('lblConvertDetail').innerHTML = 'Do you want to convert to Opportunity?';
                    controlVisiblity('ConvertToLeadOppAdmission');
                    sweetAlert('Lead Saved Sucessfully', '', 'success');

                    //                    var CId = document.getElementById("lblCampaignDetailcode").value;
                    //                    ViewCampaignCountData(CId);
                    //                    GetCampaignCountDetailsData();
                    //                    controlVisiblity('CampaignCountSearch');
                }
                else {
                    toastr.error('Duplicate Lead');
                }
            });
            if (data.d == '') {
                toastr.error('Lead Not Saved');
                waitingDialog.hide();
            }
            else {
                waitingDialog.hide();
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            waitingDialog.hide();
        })
    });
};
//Coding For convert To Lead Div End

//Coding For convert To Opportunity Div Start
function CampaignAcadYearFill() {  //To Bind Acad Year in Convert To Opportunity div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindAcadYear",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlOpportunityAcadYear").append($("<option></option>").val(item.AcadYearId).html(item.AcadYearDesc));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function CampaignDivisionFill() {    //To Bind Division in Convert To Opportunity div
    var UID = ReadCookie();
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindDivision",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"UserId":"' + UID + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlOpportunityDivision").append($("<option></option>").val(item.Source_Division_Code).html(item.Source_Division_ShortDesc));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function CampaignCenterFill(CampaignDivision) {     //To Bind Center in Convert To Opportunity div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindCenter",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"Division":"' + CampaignDivision + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlOpportunityCenter").append($("<option></option>").val(item.center_code).html(item.center_name));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function SalesStageFill() {      //To Bind Sales Stage in Convert To Opportunity div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindSalesStage",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        //async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlSalesStage").append($("<option></option>").val(item.Sales_Id).html(item.Sales_Stage_Desc));
            })
            $('#ddlSalesStage').selectpicker('refresh');
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function ProductFill(Center, AcadYear) {    //To Bind Product in Convert To Opportunity div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindProduct",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"Center":"' + Center + '","AcadYear":"' + AcadYear + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlProduct").append($("<option></option>").val(item.stream_code).html(item.stream_sdesc));
            })
            $('#ddlProduct').selectpicker('refresh');
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function GetLeadDetailIntoCampaign(LeadCode) {  //To Get Dropdown Values From Lead Div Into opportunity Div
    $("#ddlSalesStage").val(0).change();
    $("#ddlProduct").val(0).change();
    document.getElementById('txtClosuredate1').value = "";
    document.getElementById('lblsalesStage').innerHTML = "";
    document.getElementById('lblProduct').innerHTML = "";
    document.getElementById('lblClosuredate').innerHTML = "";
    document.getElementById('lblProbability').innerHTML = "";
    $('[data-id="ddlSalesStage"]').removeClass('errorClass');
    $('[data-id="ddlProduct"]').removeClass('errorClass');
    $("#txtClosuredate1").removeClass('errorClass');
    $("#txtProbability").removeClass('errorClass');
    $('[data-id="ddlSalesStage"]').removeClass('sucessClass');
    $('[data-id="ddlProduct"]').removeClass('sucessClass');
    $("#txtClosuredate1").removeClass('sucessClass');
    $("#txtProbability").removeClass('sucessClass');
    $("#ddlOpportunityAcadYear").find("option").remove();
    CampaignAcadYearFill();
    $("#ddlOpportunityDivision").find("option").remove();
    CampaignDivisionFill();
    $("#ddlOpportunityCenter").find("option").remove();
    SalesStageFill();
    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/AcadyearDivisionCenterDetail",
        contentType: "application/json; charset=utf-8",
        data: '{"Lead_Id":"' + LeadCode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                document.getElementById('lblopportunityStudentName').innerHTML = obj.StudentName;
                document.getElementById('lblopportunityEmail').innerHTML = obj.Emailid;
                document.getElementById('lblopportunityGender').innerHTML = obj.Gender;
                document.getElementById('lblopportunityMobileNo').innerHTML = obj.Handphone1;
                document.getElementById('lblopportunityCampaign').innerHTML = obj.Campaign_Name;

                $("#ddlOpportunityAcadYear").val(obj.Expected_Join_AcadYear).change();
                $('#ddlOpportunityAcadYear').attr("disabled", "disabled");
                $("#ddlOpportunityDivision").val(obj.Contact_Target_Division).change();
                $('#ddlOpportunityDivision').attr("disabled", "disabled");
                CampaignCenterFill(obj.Contact_Target_Division);
                $("#ddlOpportunityCenter").val(obj.Contact_Target_Center).change();
                $('#ddlOpportunityCenter').attr("disabled", "disabled");

                ProductFill(obj.Contact_Target_Center, obj.Expected_Join_AcadYear);
            })
            waitingDialog.hide();
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            waitingDialog.hide();
        })
    });
};

function SaveConvertLeadToOpportunityData(AcadYear, Division, Center, SalesStage, Product, ClosureDate, Probability) {    //To save Data In Convert To Opportunity Div
    var leadcode = document.getElementById("lblPKey1").value;
    var errormsg = "";
    var ProductName = $("#ddlProduct option:selected").text();
    var UID = ReadCookie();
    var v = "0";

    if (SalesStage == "0") {
        document.getElementById('lblsalesStage').innerHTML = "Select Sales Stage";
        $('[data-id="ddlSalesStage"]').addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblsalesStage').innerHTML = "";
        $('[data-id="ddlSalesStage"]').addClass('sucessClass');
    }

    if (Product == "0") {
        document.getElementById('lblProduct').innerHTML = "Select Product";
        $('[data-id="ddlProduct"]').addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblProduct').innerHTML = "";
        $('[data-id="ddlProduct"]').addClass('sucessClass');
    }

    if (ClosureDate == "") {
        document.getElementById('lblClosuredate').innerHTML = "Enter Closure Date";
        $("#txtClosuredate").addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblClosuredate').innerHTML = "";
        $("#txtClosuredate").addClass('sucessClass');
    }

    if (Probability == "") {
        document.getElementById('lblProbability').innerHTML = "Enter Probability";
        $("#txtProbability").addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblProbability').innerHTML = "";
        $("#txtProbability").addClass('sucessClass');
    }

    if (v == "1") {
        return false;
    }

    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/CampaignSaveDetail",
        contentType: "application/json; charset=utf-8",
        data: '{"Lead_id":"' + leadcode + '","Sales_Stage":"' + SalesStage + '","Opp_Expected_Close_Date":"' + ClosureDate + '", "Opp_Probability_Percent":"' + Probability + '", "Opp_Contact_Division":"' + Division + '", "Opp_Contact_Center":"' + Center + '", "Opp_Contact_AssignTo":"' + UID + '", "Created_By":"' + UID + '", "Oppor_Product":"' + ProductName + '", "Oppor_Product_Id":"' + Product + '", "acad_year":"' + AcadYear + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                if (obj.Oppur_Id == "-1") {
                    toastr.error('Opportunity Already Created');
                }
                else {
                    document.getElementById("lblCampaign_Contact_Code").value = leadcode;
                    document.getElementById('lblLead_Code').value = leadcode;
                    document.getElementById('lblOpportunity_Code').value = obj.Oppur_Id;
                    document.getElementById('lblAccount_Id').value = 'Blank';
                    //if Admission is not created then Admission creation Confirmation                    
                    document.getElementById('lblConvertHeader').innerHTML = 'Book Admission';
                    document.getElementById('lblConvertDetail').innerHTML = 'Do you want to Book Admission?';
                    controlVisiblity('ConvertToLeadOppAdmission');
                    //                    var CId = document.getElementById("lblCampaignDetailcode").value;
                    //                    ViewCampaignCountData(CId);
                    //                    GetCampaignCountDetailsData();
                    //                    controlVisiblity('CampaignCountSearch');
                    sweetAlert('Opportunity Saved Sucessfully', '', 'success');
                }
            });
            if (data.d == '') {
                toastr.error('Opportunity Not Saved');
                waitingDialog.hide();
            }
            else {
                waitingDialog.hide();
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            waitingDialog.hide();
        })
    });
};
//Coding For convert To Opportunity Div End

//Coding For book Admission Div Start
function BookAdmissionAcadYearFill() {   //To Bind Acad Year in book Admission div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindAcadYear",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlBookAdmissionAcadYear").append($("<option></option>").val(item.AcadYearId).html(item.AcadYearDesc));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function BookAdmissionDivisionFill() {   //To Bind Division in Book Admission div
    var UID = ReadCookie();
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindDivision",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"UserId":"' + UID + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlBookAdmissionDivision").append($("<option></option>").val(item.Source_Division_Code).html(item.Source_Division_ShortDesc));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function BookAdmissionCenterFill(BookAdmissionDivision) {     //To Bind Center in Book Admission div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindCenter",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"Division":"' + BookAdmissionDivision + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlBookAdmissionCenter").append($("<option></option>").val(item.center_code).html(item.center_name));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function BookAdmissionSalesStageFill() {    //To Bind Sales Stage in Book Admission div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindSalesStage",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlBookAdmissionSalesStage").append($("<option></option>").val(item.Sales_Id).html(item.Sales_Stage_Desc));
            })
            $('#ddlBookAdmissionSalesStage').selectpicker('refresh');
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function PayPlanFill() {   //To Bind Pay Plan in Book Admission div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindPayPlan",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlPayPlan").append($("<option></option>").val(item.Pay_Plan_Code).html(item.Pay_Plan_Description));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function SubjectData(Center, Product) {     //To Bind Subjects Based On Product and Center In Book Admission div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindOptionalSubject",
        contentType: "application/json; charset=utf-8",
        data: '{"Product":"' + Product + '","Center": "' + Center + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $('#TSubjectbody').html('');
            $(data.d).each(function (index, obj) {
                $('#TSubjectbody').append('<tr><td style="width:20%;"><input type="checkbox" onclick="SubjectClick()" name="chk[]" id="chkStudent" value="' + obj.SGR_DESC + '" ></td><td id="tdlblsubjectname"><input type="label" id="lblSubjectName" style="width:80%;" value="' + obj.SGR_DESC + '" ></td><td id="tdSubCode" style="display:none"><input type="label" name="lblSubjectCode" id="lblSubjectCodeID" value="' + obj.sgr_material + '" ><input type="label" name="lblVoucherType" id="lblVoucherTypeId" value="' + obj.voucher_typ + '" ><input type="label" name="lblVoucherAmount" id="lblVoucherAmountID" value="' + obj.voucher_amount + '" ><input type="label" name="lbluom" id="lbluomID" value="' + obj.uom + '" ><input type="label" name="lbluomdesc" id="lbluomdescId" value="' + obj.uom_base_name + '" ></td></tr>');
                count = obj.rowcount;
                SGR_DESC = obj.SGR_DESC;
                sgr_material = obj.sgr_material;
                voucher_amount = obj.voucher_amount;
                sgr_sel_group = obj.sgr_sel_group;
                voucher_typ = obj.voucher_typ;
                uom = obj.uom;
                uom_base_name = obj.uom_base_name;
                uom_value = obj.uom_value;
                voucher_mode = obj.voucher_mode;
            })
        }),
        error: (function () {
        })
    });
};

function FeeStructureData() {  //To Bind Fee Structures In Book Admission div
    var Opportunitycode = document.getElementById("lblOpportunityCode").value;
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindFeeStructure",
        contentType: "application/json; charset=utf-8",
        data: '{"Oppurid":"' + Opportunitycode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $('#TFeeStructurebody').html('');
            $(data.d).each(function (index, obj) {
                $('#TFeeStructurebody').append('<tr><td style="padding-top:35px;">' + obj.Voucher_Description + '</td><td style="padding-top:35px;">' + obj.Final_Voucher_Amount + '</td></tr>');
                ConId = obj.Con_Id;
                Campaign = obj.campaign;
                count = obj.rowcount;
            })
        }),
        error: (function () {
        })
    });
};

function EnrollmentDeatils() {    //To save Data In StudentInfo (Enrollment)
    var UID = ReadCookie();
    var studentId = "";
    var Opportunitycode = document.getElementById("lblOpportunityCode").value;
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/Enrollment",
        contentType: "application/json; charset=utf-8",
        data: '{"Userid":"' + UID + '","Opp_Id":"' + Opportunitycode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                studentId = obj.StudentId;
                return studentId;
            });
            if (data.d == '') {
                return studentId;
            }
        }),
        error: (function () {
        })
    });
};

function DeletePricingprocedurevalue() {    // (DeleteOldFeeStructure)
    var result = "";
    var Opportunitycode = document.getElementById("lblOpportunityCode").value;
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/DeletePricingprocedurevaluebyopp",
        contentType: "application/json; charset=utf-8",
        data: '{"Opp_Id":"' + Opportunitycode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                result = obj.Result;
                return result;
            });
            if (data.d == '') {
                return result;

            }
        }),
        error: (function () {
        })
    });
};

function InserttoGetPricingprocedurevalueByOppoId(Materialcode, Voucher_type, Voucher_Amt, Uomid, Uomname, Quantity, Amount, Remarks) {    // (DeleteOldFeeStructure)
    var result = "";
    var Opportunitycode = document.getElementById("lblOpportunityCode").value;
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/InserttoGetPricingprocedurevalue",
        contentType: "application/json; charset=utf-8",
        data: '{"Oppid":"' + Opportunitycode + '","Materialcode":"' + Materialcode + '","Voucher_type":"' + Voucher_type + '","Voucher_Amt":"' + Voucher_Amt + '","Uomid":"' + Uomid + '","Uomname":"' + Uomname + '","Unit":"' + Uomid + '","Quantity":"' + Quantity + '","Amount":"' + Amount + '","Remarks":"' + Remarks + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                result = obj.Result;
                return result;
            });
            if (data.d == '') {
                return result;
            }
        }),
        error: (function () {
        })
    });
};

function GetPricingprocedureValue(Materialcode) {    // (DeleteOldFeeStructure)
    var result = "";
    var Opportunitycode = document.getElementById("lblOpportunityCode").value;
    var PayPlan = document.getElementById("ddlPayPlan").value;
    var flag2 = "2";
    if (PayPlan == "EMI") {
        flag2 = "3";
    }
    else {
        flag2 = "2";
    }
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/GetPricingprocedureValue_New",
        contentType: "application/json; charset=utf-8",
        data: '{"Oppid":"' + Opportunitycode + '","Materialcode":"' + Materialcode + '","flag":"' + flag2 + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                result = obj.Result;
                return result;
            });
            if (data.d == '') {
                return result;
            }
        }),
        error: (function () {
        })
    });
};

function GetOpportunityDetailIntoCampaign(OpportunityCode) {  //To Get Dropdown Values From Opportunity Div Into BookAdmission Div
    $("#ddlPayPlan").val(0).change();
    document.getElementById('lblPayplan').innerHTML = "";
    document.getElementById('lblSubject').innerHTML = "";
    $("#ddlBookAdmissionAcadYear").find("option").remove();
    BookAdmissionAcadYearFill();
    $("#ddlBookAdmissionDivision").find("option").remove();
    BookAdmissionDivisionFill();
    $("#ddlBookAdmissionSalesStage").find("option").remove();
    $("#ddlBookAdmissionCenter").find("option").remove();
    $('[data-id="ddlPayPlan"]').removeClass('errorClass');
    $('[data-id="ddlPayPlan"]').removeClass('sucessClass');
    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/GetOpportunityDetail",
        contentType: "application/json; charset=utf-8",
        data: '{"Opportunity_Id":"' + OpportunityCode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                document.getElementById('lblAdmissionStudentName').innerHTML = obj.StudentName;
                document.getElementById('lblAdmissionEmailId').innerHTML = obj.Emailid;
                document.getElementById('lblAdmissionGender').innerHTML = obj.Gender;
                document.getElementById('lblAdmissionMobileNo').innerHTML = obj.Handphone1;
                document.getElementById('lblAdmissionCampaign').innerHTML = obj.Campaign_Name;

                $("#ddlBookAdmissionAcadYear").val(obj.Acad_Year).change();
                $('#ddlBookAdmissionAcadYear').attr("disabled", "disabled");

                $("#ddlBookAdmissionDivision").val(obj.Opp_Contact_Division).change();
                $('#ddlBookAdmissionDivision').attr("disabled", "disabled");
                BookAdmissionCenterFill(obj.Opp_Contact_Division);

                $("#ddlBookAdmissionCenter").val(obj.Opp_Contact_Center).change();
                $('#ddlBookAdmissionCenter').attr("disabled", "disabled");

                BookAdmissionSalesStageFill();

                $("#ddlBookAdmissionSalesStage").val(obj.SalesStage_Id);
                $('#ddlBookAdmissionSalesStage').attr("disabled", "disabled");

                $("#txtBookAdmissionClosureDate1").val(obj.Opp_Expected_Close_Date);
                document.getElementById("txtBookAdmissionClosureDate1").disabled = true;

                document.getElementById('lblBookAdmissionProbability').innerHTML = obj.Opp_Probability_Percent;
                document.getElementById('lblBookAdmissionProduct').innerHTML = obj.Oppor_Product;

                SubjectData(obj.Opp_Contact_Center, obj.Oppor_Product_Id);

            })
            waitingDialog.hide();
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            waitingDialog.hide();
        })
    });
};

function BtnProceedClick() {    // Get data on proceed button click
    controlVisiblity('BookAdmission');
    $("#divbookAdmissionProceedButton").css('display', 'inline');

    var PayPlan = document.getElementById("ddlPayPlan").value;
    var v = "0";

    if (PayPlan == "0") {
        document.getElementById('lblPayplan').innerHTML = "Select Pay Plan";
        $('[data-id="ddlPayPlan"]').addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblPayplan').innerHTML = "";
        $('[data-id="ddlPayPlan"]').addClass('sucessClass');
    }

    var chks = document.getElementsByName('chk[]');
    var SelectedSubject = "";
    var hasChecked = false;
    for (var i = 0; i < chks.length; i++) {
        if (chks[i].checked) {
            hasChecked = true;
            SelectedSubject = SelectedSubject + '<tr><td>' + chks[i].value + '</td><tr/>';
        }
    }
    if (hasChecked == false) {
        document.getElementById('lblSubject').innerHTML = "You must select at least one Subject";
        v = "1";
    }
    else {
        document.getElementById('lblSubject').innerHTML = "";
    }

    if (v == "1") {
        return false;
    }
    if (hasChecked == true && PayPlan != "0") {
        $("#divbookAdmissionProceedButton").css('display', 'none');
    }
    $("#btnbookAdmissionClose").css('display', 'inline-block');
    $("#trFeeStructure").css('display', 'table-row');
    $("#trProduct").css('display', 'table-row');
    $("#divbtnSubmit").css('display', 'inline-block');
    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    var StudentId = EnrollmentDeatils();
    var result = DeletePricingprocedurevalue();
    var SBCode = document.getElementsByName('lblSubjectCode');
    var Voucher_type = document.getElementsByName('lblVoucherType');
    var Voucher_Amt = document.getElementsByName('lblVoucherAmount');
    var Uomid = document.getElementsByName('lbluom');
    var Uomname12 = document.getElementsByName('lbluomdesc');
    var MaterialCode = "";
    for (var i = 0; i < chks.length; i++) {
        if (chks[i].checked) {
            var result1 = InserttoGetPricingprocedurevalueByOppoId(SBCode[i].value, Voucher_type[i].value, Voucher_Amt[i].value, Uomid[i].value, Uomname12[i].value, "1", Voucher_Amt[i].value, "");
            MaterialCode = MaterialCode + SBCode[i].value + ",";
        }
    }
    GetPricingprocedureValue(MaterialCode);
    FeeStructureData();

    $('#TConfirmedSubjectbody').html('');
    $('#TConfirmedSubjectbody').append(SelectedSubject);
    waitingDialog.hide();
}

function SaveStudentadmissiondata() {    // to save data in Book Admission div
    var result = "";
    var Opportunitycode = document.getElementById("lblOpportunityCode").value;
    var PayPlan = document.getElementById("ddlPayPlan").value;
    var UID = ReadCookie();
    var flag2 = "2";
    if (PayPlan == "EMI") {
        flag2 = "3";
    }
    else {
        flag2 = "2";
    }
    var chks = document.getElementsByName('chk[]');
    var SBCode = document.getElementsByName('lblSubjectCode');
    var MaterialCode = "";
    for (var i = 0; i < chks.length; i++) {
        if (chks[i].checked) {
            MaterialCode = MaterialCode + SBCode[i].value + ",";
        }
    }
    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/CreateAccount",
        contentType: "application/json; charset=utf-8",
        data: '{"Oppid":"' + Opportunitycode + '","MaterialCode":"' + MaterialCode + '","Paytype":"' + PayPlan + '","Userid":"' + UID + '","flag2":"' + flag2 + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                result = obj.Accountid;
            });
            if (data.d == '') {
                waitingDialog.hide();
            }
            else {
                waitingDialog.hide();
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            waitingDialog.hide();
        })
    });

    if (result == "0") {
        toastr.error('Admission Already Done');
        $("#btnConfirmedAdmissionClose").css('display', 'none');
    }
    else if (result == "") {
        toastr.error('Admission Not Saved');
    }
    else {
        var CId = document.getElementById("lblCampaignDetailcode").value;
        ViewCampaignCountData(CId);
        //EnterContactData();
        GetCampaignCountDetailsData();
        controlVisiblity('CampaignCountSearch');
        sweetAlert('Admission Done Sucessfully', '', 'success');
        $("#btnConfirmedAdmissionClose").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
    }
};

//Coding For book Admission Div End

//Coding For Followup Div start
function InteractedRelFill() {   //To Bind Interacted Rel in Followup div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindInteractedRel",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlInteractedRel").append($("<option></option>").val(item.InteractedWithId).html(item.InteractedWithDescription));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function FollowupStatusFill() {   //To Bind FollowupStatus in Followup div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindCampusFollowUp",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlFollowupStatus").append($("<option></option>").val(item.FollowUpId).html(item.FollowUpDescription));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function Lost_Followup_Reasons() {   //To Bind Lost Followup Reason in Followup div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindCampaign_LostFollowupResons",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlLostFollowupReason").append($("<option></option>").val(item.Id).html(item.Description));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function Followup_Remark_Conclusion() {   //To Bind Followup Remark Conclusion in Followup div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/BindCampaign_Followup_Remark_Conclusion",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlRemarkConclusion").append($("<option></option>").val(item.Id).html(item.Description));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}


function ViewStudentDetail(Recordcode) {   //followup click in grid
    controlVisiblity('FollowUp');
    var Leadflag = document.getElementById('lblLeadflag').value;
    var Opportunityflag = document.getElementById('lblOpportunityflag').value;
    var Admissionflag = document.getElementById('lblAdmissionflag').value;
    // var followup = document.getElementById('lblCurrentStatus').innerHTML;
    //    if (Leadflag == "1" && Opportunityflag == "1" && Admissionflag == "1" ) {
    //    toastr.success('This Contact Has Taken Admission'); 
    //    }
    $("#ddlInteractedRel").val(0).change();
    $("#ddlFollowupStatus").val(0).change();
    $("#ddlLostFollowupReason").val(0).change();
    $("#ddlRemarkConclusion").val(0).change();
    document.getElementById("txtInteractedWith").value = "";
    document.getElementById("txtFollowupDate1").value = "";
    document.getElementById('lblInteractedrel').innerHTML = "";
    document.getElementById('lblFollowupstatus').innerHTML = "";
    document.getElementById('lblLostFollowupReason').innerHTML = "";
    document.getElementById('lblRemarkConclusion').innerHTML = "";
    document.getElementById('lblFeedback').innerHTML = "";
    document.getElementById('lblNextFollowupdate').innerHTML = "";
    $('[data-id="ddlInteractedRel"]').removeClass('errorClass');
    $('[data-id="ddlFollowupStatus"]').removeClass('errorClass');
    $('[data-id="ddlLostFollowupReason"]').removeClass('errorClass');
    $('[data-id="ddlRemarkConclusion"]').removeClass('errorClass');
    $("#txtFeedBack").removeClass('errorClass');
    $("#txtFollowupDate").removeClass('errorClass');
    $('[data-id="ddlInteractedRel"]').removeClass('sucessClass');
    $('[data-id="ddlFollowupStatus"]').removeClass('sucessClass');
    $('[data-id="ddlLostFollowupReason"]').removeClass('sucessClass');
    $('[data-id="ddlRemarkConclusion"]').removeClass('sucessClass');
    $("#txtFeedBack").removeClass('sucessClass');
    $("#txtFollowupDate").removeClass('sucessClass');
    $("#trLostFollowupReason").css('display', 'none');

    var HandlededBy = ReadCookieName();
    document.getElementById('lblHandledBy').innerHTML = HandlededBy;
    document.getElementById("txtFeedBack").value = "";
    document.getElementById("txtFollowupDate1").value = "";
    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/ViewStudentDetail",
        contentType: "application/json; charset=utf-8",
        data: '{"RecordId":"' + Recordcode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                if (obj.LeadFlag != '0' && obj.opportunityFlag != '0' && obj.AdmissionFlag != '0') {
                    toastr.success('This Contact Has Taken Admission');
                }

                document.getElementById('lblLeadflag').innerHTML = obj.LeadFlag;
                document.getElementById('lblOpportunityflag').innerHTML = obj.opportunityFlag;
                document.getElementById('lblAdmissionflag').innerHTML = obj.AdmissionFlag;
                document.getElementById('lblFollowupStudentName').innerHTML = obj.StudentName;
                document.getElementById('lblFollowupEmail').innerHTML = obj.Emailid;
                document.getElementById('lblFollowupGender').innerHTML = obj.Gender;
                document.getElementById('lblFollowupMobileNo').innerHTML = obj.Handphone1;
                document.getElementById('lblFollowupCampaign').innerHTML = obj.Campaign;

                ViewStudent_CampaignFollowup(Recordcode);
                ViewStudent_CampaignEventFollowup(Recordcode);
            })

            if (data.d == '') {
                waitingDialog.hide();
            }
            else {
                waitingDialog.hide();
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            waitingDialog.hide();
        })
    });
};

function ViewStudent_CampaignFollowup(Recordcode) {   //followup click in grid
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/ViewStudent_CampaignFollowup",
        contentType: "application/json; charset=utf-8",
        data: '{"RecordId":"' + Recordcode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $('#TBodyFollowupData').html('');
            $(data.d).each(function (index, obj) {
                $('#TBodyFollowupData').append('<tr><td style="width:100%;">' + obj.FollowupDetail + '</br>' + obj.FollowupDetail1 + '</td></tr>');
                //                $('#TBodyFollowupData').append('<tr><td style="width:50%;">' + obj.FollowupDetail + '</td><td style="width:50%;">' + obj.FollowupDetail1 + '</td></tr>');
            })
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
        })
    });
}

function ViewStudent_CampaignEventFollowup(Recordcode) {   //followup click in grid (Event Followup)
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/ViewStudent_CampaignEventFollowup",
        contentType: "application/json; charset=utf-8",
        data: '{"RecordId":"' + Recordcode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $('#TBodyEventFollowupData').html('');
            $(data.d).each(function (index, obj) {
                $('#TBodyEventFollowupData').append('<tr><td style="width:100%;"><b>Event- </b>' + obj.Event_Name + '<br><b>Feedback Header- </b>' + obj.Event_Feedback + '<br><b>Feedback Value- </b>' + obj.Event_FeedbackValue + '</td></tr>');
            })
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
        })
    });
}


function SaveFollowupData() {    //To save Data In Follow up Div
    var InteractedWith = document.getElementById("txtInteractedWith").value;
    var InteractedRel = document.getElementById("ddlInteractedRel").value;
    var FollowupStatus = document.getElementById("ddlFollowupStatus").value;
    var LostFollowupReason = document.getElementById("ddlLostFollowupReason").value;
    var RemarkConclusion = document.getElementById("ddlRemarkConclusion").value;
    var FeedBack = document.getElementById("txtFeedBack").value;
    var FollowupDate = document.getElementById("txtFollowupDate1").value;
    var errormsg = "";
    var UID = ReadCookie();
    var RecNo = document.getElementById("lblPKey3").value;
    var v = "0";

    if (InteractedRel == "0") {
        document.getElementById('lblInteractedrel').innerHTML = "Select Interacted Rel.";
        $('[data-id="ddlInteractedRel"]').addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblInteractedrel').innerHTML = "";
        $('[data-id="ddlInteractedRel"]').addClass('sucessClass');
    }

    if (FollowupStatus == "0") {
        document.getElementById('lblFollowupstatus').innerHTML = "Select Followup Status";
        $('[data-id="ddlFollowupStatus"]').addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblFollowupstatus').innerHTML = "";
        $('[data-id="ddlFollowupStatus"]').addClass('sucessClass');
    }

    if (FollowupStatus == "01") {//if Folloup status is Lost then check FollowupLost Reason 
        if (LostFollowupReason == "0") {
            document.getElementById('lblLostFollowupReason').innerHTML = "Select Lost Followup Reason";
            $('[data-id="ddlLostFollowupReason"]').addClass('errorClass');
            v = "1";
        }
        else {
            document.getElementById('lblLostFollowupReason').innerHTML = "";
            $('[data-id="ddlLostFollowupReason"]').addClass('sucessClass');
        }
        RemarkConclusion = "";
        FollowupDate = "";
    }
    else {
        LostFollowupReason = "";

        if (RemarkConclusion == "0") {
            document.getElementById('lblRemarkConclusion').innerHTML = "Select Remark Conclusion";
            $('[data-id="ddlRemarkConclusion"]').addClass('errorClass');
            v = "1";
        }
        else {
            document.getElementById('lblRemarkConclusion').innerHTML = "";
            $('[data-id="ddlRemarkConclusion"]').addClass('sucessClass');
        }

        if (FollowupDate == "") {
            document.getElementById('lblNextFollowupdate').innerHTML = "Enter Next followup Date";
            $("#txtFollowupDate").addClass('errorClass');
            v = "1";
        }
        else {
            document.getElementById('lblNextFollowupdate').innerHTML = "";
            $("#txtFollowupDate").addClass('sucessClass');
        }
    }



    if (FeedBack == "") {
        document.getElementById('lblFeedback').innerHTML = "Enter Feedback";
        $("#txtFeedBack").addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblFeedback').innerHTML = "";
        $("#txtFeedBack").addClass('sucessClass');
    }



    if (v == "1") {
        return false;
    }

    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Campaign_Lead.asmx/FollowupSaveDetail",
        contentType: "application/json; charset=utf-8",
        data: '{"Record_Id":"' + RecNo + '","Interacted_With":"' + InteractedWith + '", "Interacted_Relation":"' + InteractedRel + '", "Feedback":"' + FeedBack + '", "Updated_By":"' + UID + '", "NextFollowupDate":"' + FollowupDate + '", "CampaignFollowup__Status":"' + FollowupStatus + '", "LostFollowup_Reason":"' + LostFollowupReason + '", "Remark_Conclusion":"' + RemarkConclusion + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                document.getElementById("lblCampaign_Contact_Code").value = obj.Campaign_Contact_Code
                document.getElementById('lblLead_Code').value = obj.Lead_Code;
                document.getElementById('lblOpportunity_Code').value = obj.Opportunity_Code;
                document.getElementById('lblAccount_Id').value = obj.Account_id;
                //if Lead is not created then Lead creation Confirmation
                if (obj.Lead_Code == 'Blank') {
                    //alert('LeadCode');
                    document.getElementById('lblConvertHeader').innerHTML = 'Convert To Lead';
                    document.getElementById('lblConvertDetail').innerHTML = 'Do you want to convert to Lead?';
                    controlVisiblity('ConvertToLeadOppAdmission');
                } //if Opportunity is not created then Opportunity creation Confirmation
                else if (obj.Opportunity_Code == 'Blank') {
                    document.getElementById('lblConvertHeader').innerHTML = 'Convert To Opportunity';
                    document.getElementById('lblConvertDetail').innerHTML = 'Do you want to convert to Opportunity?';
                    controlVisiblity('ConvertToLeadOppAdmission');
                } //if Admission is not created then Admission creation Confirmation
                else if (obj.Account_id == 'Blank') {
                    document.getElementById('lblConvertHeader').innerHTML = 'Book Admission';
                    document.getElementById('lblConvertDetail').innerHTML = 'Do you want to Book Admission?';
                    controlVisiblity('ConvertToLeadOppAdmission');
                } //if all done then Campaign count div
                else {
                    var CId = document.getElementById("lblCampaignDetailcode").value;
                    ViewCampaignCountData(CId);
                    GetCampaignCountDetailsData();
                    controlVisiblity('CampaignCountSearch');
                }
                sweetAlert('Followup Saved Sucessfully', '', 'success');
            });
            if (data.d == '') {
                toastr.error('Followup Not Saved');
                waitingDialog.hide();
            }
            else {
                waitingDialog.hide();
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            waitingDialog.hide();
        })
    });
};

//Coding For Followup Div End

function hideTD(id) {
    var td = document.getElementById(id);
    td.style.display = 'none';
}

//Cookie Functions Start

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split('&');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function ReadCookie() {
    var cookieValue = getCook('CRMCookiesLoginInfo');
    var allcookies = cookieValue;
    var ID = '';

    //Get all the cookies pairs in an array
    cookiearray = allcookies.split('&');

    // Now take key value pair out of this array
    for (var i = 0; i < cookiearray.length; i++) {
        name = cookiearray[i].split('=')[0];
        value = cookiearray[i].split('=')[1];
        ID = cookiearray[i].split('=')[2];
        if (name == 'UserID') {
            return value;
        }
    }
}

function ReadCookieName() {
    var cookieValue = getCook('CRMCookiesLoginInfo');
    var allcookies = cookieValue;
    var ID = '';
    //Get all the cookies pairs in an array
    cookiearray = allcookies.split('&');
    // Now take key value pair out of this array
    for (var i = 0; i < cookiearray.length; i++) {
        name = cookiearray[i].split('=')[0];
        value = cookiearray[i].split('=')[1];
        ID = cookiearray[i].split('=')[2];
        if (name == 'UserName') {
            return value;
        }
    }
}

function getCook(cookiename) {
    // Get name followed by anything except a semicolon
    var cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
}

//Cookie Functions End 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
