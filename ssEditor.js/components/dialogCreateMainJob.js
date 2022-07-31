const dialogCreateMainJob = 
{
    props:
    {
        icon:
        {
            type: String
        },

        item:
        {
            type: Object
        },

        onClose:
        {
            type: Function,
        },
    },

    data()
    {
        return {
            dialog: false,
        }
    },

    methods:
    {
        onClick()
        {
            this.dialog = false;
        }
    },

    template: `
        <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon color="primary" v-bind="attrs" v-on="on">
                    <v-icon>{{icon}}</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="">JOB名を入力してください</v-card-title>
                <v-card-text>
                    <v-text-field label="JOB名" :value="item?.name"></v-text-field>                    
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click.stop="onClick">OK</v-btn>
                  <v-btn text color="error" @click.stop="onClick">キャンセル</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    `
}