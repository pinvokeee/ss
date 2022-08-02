const App = 
{
    el: "#app",

    vuetify: new Vuetify(),
    
    components:
    {
        componentTitleBar,
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
                    value: "freeInput",
                },

                {
                    name: "5.退職理由",
                    value: "reason",
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
            if (name == "subJob") return this.editingData.subJob?.name;
            if (name == "content") return this.editingData.getCheckedItemListText().join("\n");
            if (name == "freeInput") return this.editingData.freeInput;
            if (name == "reason") return this.editingData.reason;

            return "";
        },

        clearEditingData()
        {
            const result = confirm("本当にすべてクリアしますか？");

            if (result) this.editingData = new EditingData();
        },

        async a()
        {
            
            // const dirHandle = await window.showDirectoryPicker(
            //     {
            //         mode: "readwrite"
            //     }
            // );

            // console.log(dirHandle.entries());

            // const a = dirHandle.entries();

            // while (a.next())
            // {
            //     console.log(a.next());
                
            // }

        // const file = await fileHandle.getFile();
        // const fileContents = await file.text();

        // const writable = await fileHandle.createWritable();
        // await writable.write("dwadwad"/*⇦書き込む内容*/);
        // await writable.close();

        }
    },

    template: `
        <v-app>

        <!-- 上部ツールバー -->
        <v-app-bar color="success" elevate-on-scroll app clipped-left>
            <v-toolbar-title class="white--text" color="white">{{jobManager.title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon color="white" @click="a">
            <v-icon>mdi-cog</v-icon>
            </v-btn>
        </v-app-bar>

        <!-- 下部ツールバー -->
        <v-app-bar class="pr-4" color="white" elevate-on-scroll bottom app clipped-left>
            <v-btn raised large min-width="200" color="primary" @click="click_showOutput">出力</v-btn>
            <v-spacer></v-spacer>
            <v-btn raised large width="80" color="error" @click="clearEditingData">クリア</v-btn>
        </v-app-bar>

        <v-navigation-drawer app clipped permanent width="400">
            <div class="pt-4 pr-4  fill-height">
            <v-timeline align-top dense class="pt-0">
                <v-timeline-item color="green" small  v-if="editingData != null" v-for="section in timelines">
                    <v-row>
                        <v-col>
                            <!-- <div>
                                {{section.name}}
                            </div> -->
                            <v-card>
                                <v-card-subtitle> {{section.name}}</v-card-subtitle>
                                <v-card-text>
                                    <v-row><v-col>{{getValue(section.value)}}</v-col></v-row>
                                    <template v-if="section.value=='job'"><v-row><v-col>{{getValue("subJob")}}</v-col></v-row></template>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-timeline-item>
            </v-timeline>
            </div>
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
                                    <v-text-field class="mt-3" placeholder="タイトルを入力してください" hide-details dense   v-model="editingData.title"></v-text-field>
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
                                        <v-card-text>{{editingData?.subJob?.tips}}</v-card-text>
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
                                    <v-textarea class="mt-3" v-model="editingData.freeInput" auto-grow no-resize solo label="左記に入力できなかった内容を入力してください"></v-textarea>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                <componentTitleBar title="5.退職理由"></componentTitleBar>
                                <v-textarea class="mt-3" v-model="editingData.reason" auto-grow no-resize solo label="退職理由を入力してください"></v-textarea>
                                </v-col>
                            </v-row>
                        </div>
                    </v-col>

                </v-row>
                </v-container>
                <v-bottom-sheet v-model="showOutputSheet" persistent height="50%">
                    <v-sheet class="pa-4 text-center" height="50%">
                        <v-toolbar color="success" height="48px" flat dense>
                            <div class="white--text">出力結果</div>
                            <v-spacer></v-spacer>
                            <v-btn icon color="white" @click="showOutputSheet=false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar>
                            
                        <textarea  class="pa-2" style="outline:none;border:1px solid gray;width:100%;height:300px;" :value="editingData.outputText"></textarea>
                            
                    </v-sheet> 
                </v-bottom-sheet>

            </v-sheet>
        </v-main>
        </v-app>
    `,
}