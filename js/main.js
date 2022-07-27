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
        const ed = new EditingData();

        return {
            jobManager: new JobManager(),
            editingData: ed,
            showOutputSheet: false,
            isEditing: false,

            dialogState:
            {
                createMainJob: false,
            },

            timelines:
            [
                {
                    name: "1.タイトル",
                    value: "title",
                },

                {
                    name: "2.職種",
                    value: "job",
                },

                {
                    name: "3.内容",
                    value: "content",
                },

                {
                    name: "4.フリー入力",
                    value: "title",
                }
            ]
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
        },

        getValue(name)
        {
            if (name == "title") return this.editingData.title;
            if (name == "job") return this.editingData.job?.name;
            if (name == "subJob") return this.editingData.subjob?.name;

            return "";
        }
    },

    template: `
        <v-app>

        <!-- 上部ツールバー -->
        <v-app-bar color="white" elevate-on-scroll app clipped-left>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>{{jobManager.title}}</v-toolbar-title>
                
            <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-app-bar>

        <!-- 下部ツールバー -->
        <v-app-bar class="pr-4" color="white" elevate-on-scroll bottom app clipped-left>
            <v-btn raised large min-width="200" color="primary" @click="click_showOutput">出力</v-btn>
            <v-spacer></v-spacer>
            <v-btn raised large width="80" color="error">クリア</v-btn>
        </v-app-bar>

        <v-navigation-drawer app clipped permanent>
            <v-timeline align-top dense class="fill-height">
                <v-timeline-item small v-if="editingData != null" v-for="section in timelines">
                    <v-row>
                        <v-col>
                            <v-row>{{section.name}}</v-row>
                            <v-row>{{getValue(section.value)}}</v-row> 
                        </v-col>
                    </v-row>
                </v-timeline-item>
            </v-timeline>
        </v-navigation-drawer>

        <v-main>


            <v-sheet height="100%">
                <v-container fluid>
                <v-row>
                    <v-col class="d-flex flex-column">
                        <div>
                            <v-row>
                                <v-col>
                                    <componentTitleBar title="1.タイトル"></componentTitleBar>
                                    <v-text-field class="mt-3" label="タイトル" hide-details dense   v-model="editingData.title"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>

                                <v-col>
                                    <componentTitleBar title="2.職種"></componentTitleBar>
                                    <v-overflow-btn hide-details editable single-line return-object dense label="メイン" v-model="editingData.job" :items="jobManager.jobs" item-text="name" >
                                        <template v-if="isEditing" v-slot:append-outer>
                                            <dialogCreateMainJob icon="mdi-Plus-Box"></dialogCreateMainJob>
                                            <dialogCreateMainJob icon="mdi-Pencil" :item="editingData.job"></dialogCreateMainJob>
                                        </template>
                                    </v-overflow-btn>

                                    <v-overflow-btn hide-details editable return-object dense label="サブ" v-model="editingData.subJob" :items="(editingData.job || {}).subJobs" item-text="name">
                                        <template v-if="isEditing" v-slot:append-outer>
                                            <v-btn icon color="primary">
                                                <v-icon>mdi-Plus-Box</v-icon>
                                            </v-btn>

                                            <v-btn icon color="primary">
                                                <v-icon>mdi-Pencil</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-overflow-btn> 

                                </v-col>

                                <v-col>
                                    <v-card>
                                        <v-card-subtitle>TIPS</v-card-subtitle>
                                    </v-card>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                    <componentTitleBar title="3.内容"></componentTitleBar>
                                    <template v-for="ch in editingData.checkedItems">                                        
                                        <v-checkbox :label="ch.name" v-model="ch.checked"></v-checkbox>
                                        <template v-for="item in ch.items">
                                            <v-text-field :disabled="!ch.checked" :label="item.name" :prefix="item.prefix" :suffix="item.suffix" v-model="item.value">
                                                </v-text-field>
                                        </template>
                                    </template>
                                </v-col>

                                <v-col class="d-flex flex-column align-stretch">
                                    <componentTitleBar title="4.フリー入力欄"></componentTitleBar>
                                    <v-textarea class="mt-3" auto-grow no-resize solo label="Solo textarea"></v-textarea>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                <componentTitleBar title="5.退職理由"></componentTitleBar>
                                <v-textarea class="mt-3" auto-grow no-resize solo label="Solo textarea"></v-textarea>
                                </v-col>
                            </v-row>
                        </div>
                    </v-col>

                </v-row>
                </v-container>
                <v-bottom-sheet v-model="showOutputSheet" persistent>
                        <v-sheet class="text-center" height="200px">
                            <v-textarea no-resize label="出力結果" :value="editingData.outputText"></v-textarea>
                        </v-sheet>
                </v-bottom-sheet>

            </v-sheet>
        </v-main>
        </v-app>
    `,
}