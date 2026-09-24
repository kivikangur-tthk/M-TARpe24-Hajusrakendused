<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="XMLrakedus._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <main>
        <asp:Xml ID="xml1" runat="server" DocumentSource="~/inimesed.xml" TransformSource="~/inimesed1.xslt" />
    </main>

</asp:Content>
