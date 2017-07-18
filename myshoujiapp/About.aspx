<%@ Page Title="关于" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="About.aspx.cs" Inherits="b2c.About" %>

<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <hgroup class="title">
        <h1><%: Title %>.</h1>
        <h2>你的应用程序说明页。</h2>
    </hgroup>

    <article>
        <p>        
            使用此区域可提供附加信息。
        </p>

        <p>        
            使用此区域可提供附加信息。
        </p>

        <p>        
            使用此区域可提供附加信息。
        </p>
    </article>

    <aside>
        <h3>附加标题</h3>
        <p>        
            使用此区域可提供附加信息。
        </p>
        <ul>
            <li><a runat="server" href="~/">主页</a></li>
            <li><a runat="server" href="~/About.aspx">关于</a></li>
            <li><a runat="server" href="~/Contact.aspx">联系方式</a></li>
        </ul>
    </aside>
</asp:Content>