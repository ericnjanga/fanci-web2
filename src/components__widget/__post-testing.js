/**
 * POST TESTING PROTOCOL
 * ---------------------
 */

/**
 * 


DELETE:                                                 NO ERRORS           CHECK     
-----------------------------------------           -------------       ----------------------------------------------
-> Post (no image) -> DELETE                                [√]             [√] (DB) ...  
-> Post -> image -> DELETE                                  [√]             [√] (DB) ... | (storage) ...


CREATE:                                                 NO ERRORS           CHECK     
-----------------------------------------           -------------       ----------------------------------------------
-> Post (no image) -> Submit                                [√]             [√] (DB) post:{ ... , file:''} 
-> Post (no image) -> Cancel                                [√]             [√] (DB) ... 
-> Post -> image -> Submit                                  [√]             [√] (DB) post:{ ... , file:'imgA'} | (storage) imgA
-> Post -> image -> Cancel                                  [√]             [√] (DB) ... | (storage) ...
-> Post -> image -> remove image -> Submit                  [√]             [√] (DB) post:{ ... , file:''} | (storage) ...
-> Post -> image -> remove image -> Cancel                  [√]             [√] (DB) ... | (storage) ...


UPDATE:                                               NO ERRORS           CHECK     
-----------------------------------------           -------------       ----------------------------------------------
-> Edit data (no image) -> Submit                           [√]             [√] Data changed in DB 
-> Edit data (no image) -> Cancel                           [√]             [√] 0 change in DB 
-> Edit image -> Submit                                     [√]             [√] (post DB) file:'imgA' | image changed in storage 
-> Edit data -> image -> Submit                             [√]             [√] Data changed in DB | (post DB) file:'imgA' | image changed in storage 
-> Edit data -> remove image -> Submit                      [√]             [√] Data changed in DB | (post DB) file:'' | 0 image in storage 
-> Edit data -> remove image -> add image -> Submit         [√]             [√] Data changed in DB | (post DB) file:'imgA' | new image in storage 
 */