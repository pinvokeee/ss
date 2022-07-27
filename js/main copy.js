const App = 
{
    el: "#app",

    vuetify: new Vuetify(),
    
    components:
    {
        componentTitleBar,
        dialogCreateMainJob,
        // jobSelecter, infoInputForm
    },

    data()
    {
        return {
            jobManager: new JobManager(),
            editingData: new EditingData(),
            showOutputSheet: false,
            isEditing: false,

            dialogState:
            {
                createMainJob: false,
            }
        }
    },

    mounted()
    {
        this.jobManager.load(jobData);
    },

    computed:
    {
        // editingData:
        // {
        //     get()
        //     {
        //         console.log(this.jobManager.editingData.job);
        //         return this.jobManager.editingData;
        //     }
        // }
    },

    methods:
    {
        click_showOutput()
        {
            this.showOutputSheet = true;
        }
    },

    template: `
        <v-app>
        <v-main>
            <!-- 上部ツールバー -->
            <v-app-bar color="white" elevate-on-scroll  app>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <v-toolbar-title>{{jobManager.title}}</v-toolbar-title>
                    
                <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-app-bar>

            <!-- 下部ツールバー -->
            <v-app-bar class="pr-4" color="white" app elevate-on-scroll bottom>
                <v-btn raised large min-width="200" color="primary" @click="click_showOutput">出力</v-btn>
                <v-spacer></v-spacer>
                <v-btn raised large width="80" color="error">クリア</v-btn>
            </v-app-bar>

            <v-sheet height="100%">
                <v-row>
                <v-col cols="auto">

                </v-col>

                <v-col cols="10">
                <v-container class="d-flex flex-column">
                    <v-row>
                        <v-col cols="auto">
                            <div class="mw">
                                <v-timeline align-top dense style="awidth:20px">
                                    <v-timeline-item small>タイトル</v-timeline-item>
                                </v-timeline>
                            </div>
                        </v-col>
                        <v-col>
                            <v-text-field label="タイトル" hide-details dense filled  v-model="editingData.title"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="auto">
                            <div class="mw">
                                <v-timeline align-top dense style="awidth:20px">
                                    <v-timeline-item small>職種</v-timeline-item>
                                </v-timeline>
                            </div>
                        </v-col>
                        <v-col>
                        <!-- <div class="pa-4" style="width:100%"> -->
                            <v-card tile outlined>
                                <!-- <v-card-subtitle class="blue--text"> -->
                                    <componentTitleBar title="②職種"></componentTitleBar>
                                <!-- </v-card-subtitle> -->
                                <v-card-text class="pa-2">
                                    <v-overflow-btn editable single-line return-object dense label="メイン" v-model="editingData.job" :items="jobManager.jobs" item-text="name" >

                                        <template v-if="isEditing" v-slot:append-outer>

                                            <dialogCreateMainJob icon="mdi-Plus-Box"></dialogCreateMainJob>
                                            <dialogCreateMainJob icon="mdi-Pencil" :item="editingData.job"></dialogCreateMainJob>

                                        </template>

                                    </v-overflow-btn>

                                    <v-overflow-btn editable return-object dense label="サブ" v-model="editingData.subJob" :items="(editingData.job || {}).subJobs" item-text="name">

                                        <template v-if="isEditing" v-slot:append-outer>

                                            <v-btn icon color="primary">
                                                <v-icon>
                                                    mdi-Plus-Box 
                                                </v-icon>
                                            </v-btn>
                                    
                                            <v-btn icon color="primary">
                                                <v-icon>
                                                    mdi-Pencil 
                                                </v-icon>
                                            </v-btn>

                                        </template>
                                    </v-overflow-btn>                        


                                </v-card-text>
                            </v-card>
                        <!-- </div> -->
                        </v-col>
                        <v-col>
                            <!-- <div class="pa-4 " style="width:100%"> -->
                                <v-card tile class="" outlined>
                                <componentTitleBar title="TIPS"></componentTitleBar>
                                </v-card>
                            <!-- </div> -->
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="auto">
                            <div class="mw">
                                <v-timeline width="100%" align-top dense style="awidth:20px">
                                    <v-timeline-item small>職種</v-timeline-item>
                                </v-timeline>
                            </div>
                        </v-col>
                        <v-col>
                            <v-card outlined>
                            <!-- <v-card style="height:100%;flex:1;" class="overflow-auto" outlined> -->
                                <componentTitleBar title="内容"></componentTitleBar>
                                <v-card-text>
                                    <template v-for="ch in editingData.checkedItems">
                                        
                                        <v-checkbox :label="ch.name" v-model="ch.checked"></v-checkbox>
                                        <template v-for="item in ch.items">
                                            <v-text-field :disabled="!ch.checked" :label="item.name" :prefix="item.prefix" :suffix="item.suffix" v-model="item.value">
                                                </v-text-field>
                                        </template>

                                    </template>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>

                <v-bottom-sheet v-model="showOutputSheet" persistent>
                        <v-sheet class="text-center" height="200px">
                            <v-textarea no-resize label="出力結果" :value="editingData.outputText"></v-textarea>
                        </v-sheet>
                </v-bottom-sheet>
</v-col>
</v-row>
            </v-sheet>
        </v-main>
        </v-app>
    `,
}