const { renderHead } = require("./head")
const { renderFooter } = require("./footer")
const { renderCore } = require("./core")

const renderIndex = (context, entity, tab, data) => {
    return `<!DOCTYPE html>
    <html lang="fr" data-bs-theme="dark">
    
    <!-- Head -->
    ${renderHead()}
    
    <body>
    
      <!-- Header -->
      <div id="headerDiv">
      <header>
		<nav class="navbar navbar-expand-lg">

	
    <a class="navbar-brand" href="/ppitv3/public/home">

	

    <img height="60" src="/flow-er/img/flow-er.png" alt="Flow-ER">



    </a>

			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNavDropdown">
				<ul class="navbar-nav">
					<li class="nav-item">
						&nbsp;&nbsp;<a class="navbar-brand"  href="/ppitv3/public/home" rel="follow">ADMIN58, Bruno</a>
					</li>
                    <li class="nav-item">
                    	<a class="nav-link"  href="/ppitv3/public/home" rel="follow">Accueil</a>
                    </li>
					<li class="nav-item dropdown active">
						<a class="nav-link dropdown-toggle"  href="#" id="navbarDropdownAppLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							PPIT Engagements						</a>
						<div class="dropdown-menu" aria-labelledby="navbarDropdownAppLink">

					
							<a class="dropdown-item" href="/ppitv3/public/account/index/p-pit-studies?tab=contact">
				          		P-Pit Engagements				          	</a>
								
							<a class="dropdown-item" href="/ppitv3/public/commitment/index/p-pit-studies?tab=studies-subscription">
				          		P-Pit Studies				          	</a>
								
							<a class="dropdown-item" href="/ppitv3/public/user/index/generic?tab=user">
				          		P-Pit Admin				          	</a>
			
						</div>
					</li>
					<li class="nav-item dropdown">
				        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownVcardLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				        	<span class="far fa-lg fa-user" > </span><span class="caret"></span></a>
				        <div class="dropdown-menu" aria-labelledby="navbarDropdownVcardLink">
					<!--  Mettre le bouton "mot de passe en commentaire jusqu'a ce que la fonctionnalité soit développée" -->	
						
				       <!--    	<a class="dropdown-item" id="newPasswordAnchor" href="#">
				          		Mot de passe				        </a> -->
				          	<a class="dropdown-item" id="logoutAnchor" href="#">
				          		Se déconnecter				          	</a>
				        </div>
		        	</li>

                    <li class="nav-item">
                      <a class="nav-link" href="" title="Afficher la documentation">
                        <i class="far fa-question-circle fa-lg" ></i>
                      </a>
                    </li>

				</ul>
			</div>
		</nav>
	</header></div>
    
  <div class="container">
    <div class="card">
      <div class="card-header" id="menuDiv"><div id="main_menu">
      <ul class="nav nav-pills nav-justified flex-column flex-sm-row">
                  
          <li class="nav-item">
              <a class="nav-link active " href="#" id="tab/contact-anchor">
                  Prospects            </a>
          </li>
                        
          <li class="nav-item">
              <a class="nav-link  " href="#" id="tab/subscription-anchor">
                  Planning            </a>
          </li>
                        
          <li class="nav-item">
              <a class="nav-link  " href="#" id="tab/subscription-anchor">
                  Factures            </a>
          </li>
  
      
      </ul>
    </div></div>
      <div class="card-body">

        <input type="hidden" id="instanceCaption" value="${context.instanceCaption}" />

    <!-- Indicators section-->
    
        <input type="hidden" id="shortcutsRoute" value="generic/${entity}/shortcut?tab=${tab}" />
        <input type="hidden" id="countRoute" value="generic/${entity}/count?tab=${tab}" />
        <div class="section" id="shortcutsPanel"></div>
    
    <!-- Search section-->
    
        <input type="hidden" id="searchRoute" value="/bo/search/${entity}">
        <div class="section" id="searchPanel"></div>
    
    <!-- List section-->
        
        <input type="hidden" id="listRoute" value="/bo/list/${entity}" />
        <input type="hidden" id="listGroupRoute" value="generic/${entity}/groupUpdate?tab=${tab}" />
      
        <input type="hidden" id="listWhereHidden" value="${data.where} />
        <input type="hidden" id="listOrderHidden" value="${data.order}" />
        <input type="hidden" id="listLimitHidden" value="${data.limit}" />
    
        <div class="section" id="listPanel"></div>
    
        <input type="hidden" id="detailRoute" value="/bo/detail/${entity}" />
        <input type="hidden" id="groupRoute" value="bo/group/${entity}" />
    
      </div>
    </div>
    </div>
    
    <div class="modal fade" id="listDetailModalForm" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="listDetailModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="listDetailModalLabel"></h5>
            <div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="${context.localize("Cancel")}">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div class="modal-body" id="listDetailModal">
          </div>
        </div>
      </div>
    </div>
    
    <div class="modal fade" id="groupModalForm" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="listGroupModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${context.localize("Grouped actions")}</h5>
            <div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="${context.localize("Cancel")}">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div class="modal-body" id="groupModal">
          </div>
        </div>
      </div>
    </div>
   
    <!-- login modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="modalFormLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${context.localize("Login")}</h5>
        </div>
        <div class="modal-body" id="loginPanel">
    
          <?php if ($googleClientId) : ?>
    
            <div class="col-sm-12">
                <div id="buttonDiv"></div> 
            </div>
    
          <?php endif ?>
    
          </div>
        </div>
      </div>
    </div>
    
    <!-- newPassword modal -->
    <div class="modal fade" id="newPasswordModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="modalFormLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${context.localize("New password")}</h5>
            <div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="${context.localize("Cancel")}">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div class="modal-body" id="newPasswordPanel"></div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    ${renderFooter(context)}
    
    </body>

    <!-- Scripts -->
    ${renderCore()}

    </html>`
}

module.exports = {
    renderIndex
}
