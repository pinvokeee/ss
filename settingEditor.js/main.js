const App = 
{
    el: "#app",

    vuetify: new Vuetify(),
    
    components:
    {
    },

    data()
    {
        return {
            jobManager: new JobManager(),
            selectedMainJob: null,
            selectedSubJob: null,
        }
    },

    mounted()
    {
        this.jobManager.load(jobData);
    },

    computed:
    {

    },

    methods:
    {
        
    },

    template: `
        <v-app>

        <!-- 上部ツールバー -->
        <v-app-bar dark color="error" elevate-on-scroll app clipped-left>
            <v-toolbar-title>JOB設定</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn icon color="white">
            <v-icon>mdi-cog</v-icon>
            </v-btn> -->

            <!-- <template v-slot:extension>
                <v-tabs v-model="tab" align-with-title >
                    <v-tabs-slider color="yellow"></v-tabs-slider>
                    <v-tab v-for="mainJob in jobManager.jobs" :key="mainJob.ID">
                        {{ mainJob.name }}
                    </v-tab>
                </v-tabs>
                <v-btn text v-icon>メインJOB追加</v-btn>

            </template> -->
        </v-app-bar>
<!-- 
        <v-navigation-drawer app clipped permanent width="40%">
                <v-row>
                    <v-col cols="6">

                        <v-list dense>
                            <v-subheader>REPORTS</v-subheader>
                            <v-list-item-group v-model="selectedMainJob" color="primary">
                                <v-list-item v-for="job in jobManager.jobs" :key="job.ID" :value="job">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="job.name"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>

                    </v-col>

                    <v-col cols="6">

                        <v-list dense>
                            <v-subheader>A</v-subheader>
                            <v-list-item-group v-model="selectedSubJob" color="primary">
                                <v-list-item v-for="job in selectedMainJob?.subJobs" :key="job.ID" :value="job">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="job.name"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                        
                    </v-col>

                </v-row>
            </v-navigation-drawer> -->

        
        <v-main>            

        <v-container class="fill-height" color="red" fluid align-start>
            <v-row class="" >

                <v-col cols="auto">

                    <v-list dense  class="fill-height">

                        <v-toolbar flat dense>
                            <v-toolbar-title>メイン</v-toolbar-title>
                            <v-btn icon>
                                <v-icon>mdi-plus-circle</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </v-toolbar>

                        <v-list-item-group v-model="selectedMainJob" color="primary">
                            <v-list-item v-for="job in jobManager.jobs" :key="job.ID" :value="job">
                                <v-list-item-content>
                                    <v-list-item-title v-text="job.name"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>

                </v-col>

                <v-col cols="auto">
                    <v-list dense>

                        <v-toolbar flat dense>
                            <v-toolbar-title>サブ</v-toolbar-title>
                            <v-btn icon>
                                <v-icon>mdi-plus-circle</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </v-toolbar>

                        <v-list-item-group v-model="selectedSubJob" color="primary">
                            <v-list-item v-for="job in selectedMainJob?.subJobs" :key="job.ID" :value="job">
                                <v-list-item-content>
                                    <v-list-item-title v-text="job.name"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                    
                </v-col>

                <v-col class="overflow-auto" style="max-height:80%">
                    <v-toolbar flat dense>
                        <!-- <v-spacer></v-spacer> -->

                        <v-btn >
                            <v-icon>mdi-plus-circle</v-icon>
                            新規追加
                        </v-btn>

                    </v-toolbar>
                    <v-sheet >
                        <div v-for="info in selectedSubJob?.infoList" class="mb-8">
                            <v-sheet class="pa-4">
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field label="項目名" v-model="info.name" dense hide-details></v-text-field>
                                    </v-col>
                                </v-row>
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
                                                    <v-btn icon color="primary" @click="a">
                                                    <v-icon>mdi-plus-circle</v-icon>
                                                    </v-btn>
                                                </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in info.items">
                                                <td><v-text-field placeholder="入力してください" v-model="item.prefix" dense hide-details></v-text-field></td>
                                                <td><v-text-field placeholder="入力してください" v-model="item.name" dense hide-details></v-text-field></td>
                                                <td><v-text-field placeholder="入力してください" v-model="item.suffix" dense hide-details></v-text-field></td>                                                
                                                <td>                                                
                                                    <v-btn icon color="primary" @click="a">
                                                    <v-icon>mdi-arrow-up-box</v-icon>
                                                    </v-btn>
                                                </td>
                                                <td>
                                                    <v-btn icon color="error" @click="a">
                                                    <v-icon>mdi-minus-circle</v-icon>
                                                    </v-btn>
                                                </td>
                                                </tr>
                                            </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-col>
                                </v-row>
                            </v-sheet>

                            <v-divider class="mt-4"></v-divider>

                        </div>
                    </v-sheet>
                </v-col> 
            </v-row>
        </v-container>

        </v-main>
        </v-app>
    `,
}