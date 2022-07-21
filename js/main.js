const App = 
{
    el: "#app",

    vuetify: new Vuetify(),
    
    components:
    {
        // jobSelecter, infoInputForm
    },

    data()
    {
        return {
            jobManager: new JobManager(),
            dropdown_edit: [
                { text: '100%' },
                { text: '75%' },
                { text: '50%' },
                { text: '25%' },
                { text: '0%' },
              ],
        
        }
    },

    mounted()
    {
        this.jobManager.load(jobData);
        console.log(this.jobManager);
    },

    computed:
    {
        editingData:
        {
            get()
            {
                console.log(this.jobManager.editingData.job);
                return this.jobManager.editingData;
            }
        }
    },

    methods:
    {
        
    },

    template: `
    <v-app>
      <v-main>
        <v-app-bar color="white" elevate-on-scroll  app>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>{{jobManager.title}}</v-toolbar-title>
                
            <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
            </v-btn>

            </v-app-bar>
            <v-app-bar class="pr-4" color="white" app elevate-on-scroll bottom>
            <v-btn raised large min-width="200" color="primary">出力</v-btn>
            <v-spacer></v-spacer>
            <v-btn raised large width="80" color="error">クリア</v-btn>
        </v-app-bar>
        <v-sheet>

            <div style="height:100%" class="d-flex flex-column">
                <div class="d-flex flex-row">
                    
                    <div style="width:100%">
                        <v-text-field label="タイトル"></v-text-field>
                    </div>
                    
                    <div style="width:100%">                        
                    </div>
                </div>
  
                <div class="d-flex flex-row">

                    <div style="width:100%">
                        <v-card class="" outlined>
                            <v-card-subtitle>②職種</v-card-subtitle>
                            <v-card-text>
                                <v-overflow-btn editable return-object dense label="メイン" v-model="editingData.job" :items="jobManager.jobs" item-text="name"></v-overflow-btn>
                                <v-overflow-btn editable return-object dense label="サブ" :items="(editingData.job || {}).subJobs" item-text="name"></v-overflow-btn>                        
                            </v-card-text>
                        </v-card>
                    </div>

                    <div style="width:100%">
                        <v-card class="" outlined>
                        <v-card-subtitle>TIPS</v-card-subtitle>
                        </v-card>
                    </div>

                </div>

                <div style="height:100%" class="d-flex flex-row">
                    <div style="width:100%">
                        <v-card style="height:100%;flex: 1;" class="overflow-auto" outlined>
                            <v-card-subtitle>内容</v-card-subtitle>
                            <v-card-text>
                                <v-overflow-btn editable return-object dense label="メイン" v-model="editingData.job" :items="jobManager.jobs" item-text="name"></v-overflow-btn>
                                <v-overflow-btn editable return-object dense label="サブ" :items="(editingData.job || {}).subJobs" item-text="name"></v-overflow-btn>                        
                            </v-card-text>
                        </v-card>
                    </div>
                    <div style="width:100%">
                    </div>
                </div>
            </div>

            <!-- <div class="d-flex flex-row">
                <div style="width:100%" class="d-flex flex-column">
                    
                    <v-text-field label="タイトル"></v-text-field>

                    <v-card class="" outlined>
                        <v-card-subtitle>②職種</v-card-subtitle>
                        <v-card-text>
                            <v-overflow-btn editable return-object dense label="メイン" v-model="editingData.job" :items="jobManager.jobs" item-text="name"></v-overflow-btn>
                            <v-overflow-btn editable return-object dense label="サブ" :items="(editingData.job || {}).subJobs" item-text="name"></v-overflow-btn>                        
                        </v-card-text>
                    </v-card>

                    <v-card style="height:100%" class="overflow-auto" outlined>
                        <v-card-subtitle>内容</v-card-subtitle>
                        <v-card-text>
                            <v-overflow-btn editable return-object dense label="メイン" v-model="editingData.job" :items="jobManager.jobs" item-text="name"></v-overflow-btn>
                            <v-overflow-btn editable return-object dense label="サブ" :items="(editingData.job || {}).subJobs" item-text="name"></v-overflow-btn>                        
                        </v-card-text>
                    </v-card>

                </div>
                <div style="width:100%" class="d-flex flex-column">
                <div></div>
                <v-card class="" outlined>
                        <v-card-subtitle>TIPS</v-card-subtitle>
                    </v-card>
                </div>
            </div> -->

            <!-- <v-container fluid >
            <v-row>
                <v-col>
                    <v-text-field label="タイトル"></v-text-field>
                </v-col>
                <v-col>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-card class="mx-auto" outlined>
                                <v-card-subtitle>②職種</v-card-subtitle>
                                <v-card-text>
                                    <v-overflow-btn editable return-object dense label="メイン" v-model="editingData.job" :items="jobManager.jobs" item-text="name"></v-overflow-btn>
                                    <v-overflow-btn editable return-object dense label="サブ" :items="(editingData.job || {}).subJobs" item-text="name"></v-overflow-btn>                        
                                </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="mx-auto" outlined>
                        <v-card-subtitle>TIPS</v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-card class="mx-auto overflow-auto" height="100%" outlined>
                        <v-card-subtitle>内容</v-card-subtitle>
                        <v-card-text>
                            <v-overflow-btn editable return-object dense label="メイン" v-model="editingData.job" :items="jobManager.jobs" item-text="name"></v-overflow-btn>
                            <v-overflow-btn editable return-object dense label="サブ" :items="(editingData.job || {}).subJobs" item-text="name"></v-overflow-btn>                        
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                <v-textarea label="フリースペース"></v-textarea>
                    <v-text-field label="退職理由"></v-text-field>
                </v-col>
            </v-row>


            </v-container> -->
        </v-sheet>



      </v-main>
    </v-app>




   
    `
}