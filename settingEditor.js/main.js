/**
 * ツールチップ表示用ボタンコンポーネント
 */
const componentToolTipButton = 
{
    props:
    {
        buttonText:
        {
            type: String
        },

        buttonIcon:
        {
            type: String
        },

        color:
        {
            type: String
        },

        disabled:
        {
            type: Boolean
        }
    },

    template: `
    <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon :disabled="disabled" :color="color" tabIndex="-1" v-bind="attrs" v-on="on" @click="$emit('click')">
                    <v-icon>{{buttonIcon}}</v-icon>
                </v-btn>
            </template>
        <span>{{buttonText}}</span>
    </v-tooltip>
    `
}

const App = 
{
    el: "#app",

    vuetify: new Vuetify(),
    
    components:
    {
        "ttButton": componentToolTipButton,
    },

    data()
    {
        return {
            jobManager: new JobManager(),

            local:
            {
                _selectedMainJob: null,
                _selectedSubJob: null,
            },
        }
    },

    mounted()
    {
        this.jobManager.load(jobData);
    },

    computed:
    {
        selectedMainJob:
        {
            get()
            {
                return this.local._selectedMainJob;
            },

            set(value)
            {
                this.local._selectedMainJob = value;
                this.selectedSubJob = null;
            }
        },
        
        selectedSubJob:
        {
            get()
            {
                return this.local._selectedSubJob;
            },

            set(value)
            {
                this.local._selectedSubJob = value;
            }
        }      
    },

    methods:
    {
        click_append_newMainJob()
        {
            const new_item = new Job();

            new_item.ID = this.jobManager.jobs.length;
            new_item.name = `新規JOB${new_item.ID + 1}`;

            this.edit_JobName(new_item, "JOB名を入力してください");

            this.jobManager.jobs.push(new_item);
        },

        click_removeMainJobItem(ID)
        {
            this.selectedMainJob = null;
            this.jobManager.jobs.splice(ID, 1);
            this.assignID(this.jobManager.jobs);
        },

        click_removeSubJobItem(ID)
        {
            
            this.selectedSubJob = null;
            this.selectedMainJob.subJobs.splice(ID, 1);
            this.assignID(this.selectedMainJob.subJobs);
        },

        click_append_newSubJob()
        {
            const new_item = new SubJob();

            new_item.ID = this.selectedMainJob.subJobs.length;
            new_item.name = `新規サブJOB${new_item.ID + 1}`;

            this.edit_JobName(new_item, "サブJOB名を入力してください");

            this.selectedMainJob.subJobs.push(new_item);
        },

        click_changeName_selectedMainJob()
        {
            this.edit_JobName(this.selectedMainJob, "変更後のJOB名を入力してください");
        },

        click_change_moveMainJob(parent, fromIndex)
        {
            const item = parent[fromIndex];
            const moved_id = this.swapItem(parent, fromIndex);
            
            this.assignID(parent);

            this.$nextTick(function() 
            {
                this.selectedMainJob = null;

                this.$nextTick(function() 
                {
                    this.selectedMainJob = parent[moved_id];            
                });
            });
        },

        click_changeName_selectedSubJob()
        {
            this.edit_JobName(this.selectedSubJob, "変更後のサブJOB名を入力してください");
        },

        click_change_moveSubJob(parent, fromIndex)
        {
            const item = parent[fromIndex];
            const moved_id = this.swapItem(parent, fromIndex);
            
            this.$nextTick(function() 
            {
                this.selectedSubJob = null;

                this.$nextTick(function() 
                {
                    this.selectedSubJob = parent[moved_id];            
                });
            });
        },

        edit_JobName(item, message)
        {
            const name = prompt(message, item.name);
            if (name != null || name.length > 0) item.name = name;

            return item;
        },

        click_append_newInfoItem()
        {
            const new_info = new Info();
            new_info.ID = this.selectedSubJob.infoList.length;
            new_info.name = "新規項目";

            this.selectedSubJob.infoList.push(new_info);

            this.$nextTick(function() 
            {
                const elList = this.$refs["infoList"];
                const lastElement = elList[elList.length - 1];
                lastElement.scrollIntoView({behavior: 'smooth'});

                lastElement.querySelector("input").select();
            });
        },

        click_move_infoItem(parent, fromIndex)
        {
            this.swapItem(parent.infoList, fromIndex);
        },

        click_remove_infoItem(parent, index)
        {
            parent.infoList.splice(index, 1);
        },

        click_append_newInputItem(target_info)
        {
            const new_inputItem = new InputItem();
            new_inputItem.ID = target_info.items.length;

            target_info.items.push(new_inputItem);
        },

        click_move_inputItem(parent, fromIndex)
        {
            this.swapItem(parent.items, fromIndex);
        },

        click_remove_inputItem(parent, index)
        {
            parent.items.splice(index, 1);
        },

        swapItem(arr, fromIndex)
        {
            const to = fromIndex + 1 < arr.length ? fromIndex + 1 : fromIndex - 1;
            const to_id = arr[to].ID;
            arr[to].ID = arr[fromIndex].ID;
            arr[fromIndex].ID = to_id;
            
            arr.sort((a, b) => a.ID - b.ID);

            return to;
        },

        assignID(arr)
        {
            for (let i = 0; i < arr.length; i++)
            {
                arr[i].ID = i;
            }
        },

        click_download_settingFile()
        {
            this.$refs["download_link"].click();
        },

        download() 
        {
            const st = `const jobData=${this.jobManager.generateJSONString()}`;
            var content = st;
            var blob = new Blob([ content ], { "type" : "text/plain" });

            this.$refs["download_link"].href = window.URL.createObjectURL(blob);
        }

    },

    template: `
        <v-app>

        <!-- 上部ツールバー -->
        <v-app-bar  dark color="error" elevate-on-scroll app clipped-left>
            <v-toolbar-title>JOB設定</v-toolbar-title>
            <v-spacer></v-spacer>
            <ttButton color="white" buttonText="設定ファイルをダウンロード" buttonIcon="mdi-tray-arrow-down" @click="click_download_settingFile"></ttButton>
            <a style="display:none;" ref="download_link" href="#" download="jobData.js" @click="download"></a>
        </v-app-bar>

        <v-navigation-drawer permanent clipped app width="500">
            <v-row class="fill-height" no-gutters>

                <v-navigation-drawer permanent mini-variant mini-variant-width="50%">                    
                    <div style="width: 98%">
                        <v-list dense>
                            <v-toolbar height="80px" flat dense style="z-index:2;position:sticky;top:0;">
                                <div>
                                    <v-row>
                                        メイン
                                    </v-row>
                                    <v-row>
                                    <ttButton buttonText="JOB追加" buttonIcon="mdi-plus" color="primary" @click="click_append_newMainJob"></ttButton>
                                    <ttButton :disabled="selectedMainJob == null" buttonText="JOB名編集" buttonIcon="mdi-pencil" color="primary" @click="click_changeName_selectedMainJob"></ttButton>
                                    <ttButton 
                                    :disabled="selectedMainJob == null" 
                                    :buttonIcon="jobManager?.jobs.length - 1 == selectedMainJob?.ID ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold'"
                                    :buttonText="jobManager?.jobs.length - 1 == selectedMainJob?.ID ? '上へ移動' : '下へ移動'"
                                    @click="click_change_moveMainJob(jobManager?.jobs, selectedMainJob?.ID)"
                                    color="primary">
                                    </ttButton>
                                    <ttButton :disabled="selectedMainJob == null"  color="error" buttonText="削除" buttonIcon="mdi-close" @click="click_removeMainJobItem(selectedMainJob.ID)"></ttButton>
                                    </v-row>
                                </div>
                            </v-toolbar>
                            
                            <v-list-item-group v-model="selectedMainJob" color="primary">
                                <v-list-item v-for="job in jobManager.jobs" :key="job.ID" :value="job">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="job.name"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </div>
                </v-navigation-drawer>
                
                <div style="width:49%;">

                    <v-list dense class="grow">
                        <v-toolbar height="80px" color="white" flat dense style="z-index:2;position:sticky;top:0;">
                            <div>
                                <v-row>
                                    サブJOB
                                </v-row>
                                <v-row>
                                    <ttButton :disabled="selectedMainJob == null" buttonText="JOB追加" buttonIcon="mdi-plus" color="primary" @click="click_append_newSubJob"></ttButton>
                                    <ttButton :disabled="selectedSubJob == null" buttonText="JOB名編集" buttonIcon="mdi-pencil" color="primary" @click="click_changeName_selectedSubJob"></ttButton>
                                    <ttButton 
                                    :disabled="selectedSubJob == null" 
                                    :buttonIcon="selectedMainJob?.subJobs.length - 1 == selectedSubJob?.ID ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold'"
                                    :buttonText="selectedMainJob?.subJobs.length - 1 == selectedSubJob?.ID ? '上へ移動' : '下へ移動'"
                                    @click="click_change_moveSubJob(selectedMainJob?.subJobs, selectedSubJob?.ID)"
                                    color="primary">
                                    </ttButton>
                                    <ttButton :disabled="selectedSubJob == null"  color="error" buttonText="削除" buttonIcon="mdi-close" @click="click_removeSubJobItem(selectedSubJob.ID)"></ttButton>
                                    
                                </v-row>
                            </div>
                        </v-toolbar>

                        <v-list-item-group  class="grow" v-model="selectedSubJob" color="primary">
                            <v-list-item v-for="job in selectedMainJob?.subJobs" :key="job.ID" :value="job">
                                <v-list-item-content>
                                    <v-list-item-title v-text="job.name"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </div>

            </v-row>

        </v-navigation-drawer>
   
 
        <v-main>
        <v-sheet class="d-flex flex-column" >

            <v-toolbar class="mb-2" style="z-index:2;position:sticky;top:68px;" flat dense>
                <v-btn :disabled="selectedSubJob == null" color="primary" @click="click_append_newInfoItem">
                    <v-icon>mdi-plus</v-icon>
                    新規追加
                </v-btn>
            </v-toolbar>
            

            <div class="pa-4" v-if="selectedSubJob != null">
                <v-textarea label="tips" rows="3" placeholder="表示するtipsを入力してください" auto-grow outlined no-resize v-model="selectedSubJob.tips"></v-textarea>
            </div>

            <v-container class="fill-height" align-start>
                <v-row>
                    <v-col>
                        <div v-for="(info, info_index) in selectedSubJob?.infoList" class="mb-8" ref="infoList">
                            <v-card outlined class="pa-4">
                                <v-card-subtitle>
                                    <v-row>
                                        <v-col>
                                            <v-text-field label="項目名" v-model="info.name" dense hide-details></v-text-field>
                                        </v-col>
                                        <v-col  cols="1">
                                            <ttButton color="primary" :disabled="selectedSubJob?.infoList.length < 2" :buttonText="selectedSubJob?.infoList.length - 1 == info_index ? '上へ移動' : '下へ移動'" :buttonIcon="selectedSubJob?.infoList.length - 1 == info_index ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold'" @click="click_move_infoItem(selectedSubJob, info_index)"></ttButton>
                                        </v-col>
                                        <v-col  cols="1">
                                            <ttButton color="error" buttonText="削除" buttonIcon="mdi-close" @click="click_remove_infoItem(selectedSubJob, info_index)"></ttButton>
                                        </v-col>
                                    </v-row>
                                    </v-card-subtitle>
                                <v-card-text>
                                <v-row>
                                    <v-col>
                                        <v-simple-table>
                                            <template v-slot:default>
                                            <thead>
                                                <tr>
                                                <th class="text-left">
                                                    接頭辞
                                                </th>
                                                <th class="text-left">
                                                    項目名
                                                </th>
                                                <th class="text-left">
                                                    接尾辞
                                                </th>
                                                <th>
                                                </th>
                                                <th>
                                                    <ttButton color="primary" buttonText="項目を追加" buttonIcon="mdi-plus" @click="click_append_newInputItem(info)"></ttButton>
                                                </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in info.items">
                                                <td><v-text-field placeholder="入力してください" v-model="item.prefix" dense hide-details></v-text-field></td>
                                                <td><v-text-field placeholder="入力してください" v-model="item.name" dense hide-details></v-text-field></td>
                                                <td><v-text-field placeholder="入力してください" v-model="item.suffix" dense hide-details></v-text-field></td>                                                
                                                <td>                                                                                                    
                                                    <ttButton color="primary" :buttonText="info.items.length - 1 == index ? '上へ移動' : '下へ移動'" :buttonIcon="info.items.length - 1 == index ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold'" @click="click_move_inputItem(info, index)"></ttButton>
                                                </td>
                                                <td>                                                
                                                    <ttButton color="error" buttonText="削除" buttonIcon="mdi-close" @click="click_remove_inputItem(info, index)"></ttButton>
                                                </td>
                                                </tr>
                                            </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-col>
                                </v-row>

                                </v-card-text>
                            </v-card>

                        </div>
                    </v-col>
                        </v-row>                            
                    </v-col>                        
                </v-row>
                
            </v-container>
        </v-sheet>
        </v-main>
        </v-app>
    `,
}

