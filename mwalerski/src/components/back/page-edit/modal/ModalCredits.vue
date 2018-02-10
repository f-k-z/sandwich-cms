<template>
  <div class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{ modalTitle }}</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="sliceCreditSubtitle">Subtitle</label>
            <input type="text" class="form-control" id="sliceCreditSubtitle" v-model="subtitle">
          </div>
          <hr>
          <div class="form-group">
            <div class="row">
              <div class="col-md-4">
                <input type="text" placeholder="Role" class="form-control" id="sliceCreditsRole" v-model="currentRole">
              </div>
              <div class="col-md-4">
                <input type="text" placeholder="Name" class="form-control" id="sliceCreditsName" v-model="currentName">
              </div>
              <div class="col-md-4">
                <button type="button" v-on:click="addCredit" class="btn btn-default">Add credit</button>
              </div>
            </div>
          </div>
          <div id="creditsHolder" class="credits">
            <ul>
              <li v-for="credit in credits">
                <b>{{ credit.role }}</b><span v-if="credit.name && credit.role">&nbsp;</span>{{ credit.name }}
                  <button type="button" id="removeCreditBtn" v-on:click="removeCredit(credit)" class="btn">X</button>
              </li>
            </ul>
          </div>
          <hr>
          <div class="form-group">
            <input type="checkbox" id="sliceCreditsVisible" v-model="currentSlice.visible">
            <label for="sliceCreditsVisible">Visible</label>
          </div>
          <div class="form-group">
            <input type="checkbox" id="sliceCreditsLocked" v-model="currentSlice.locked">
            <label for="sliceCreditsLocked">Locked</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" v-on:click="saveSlice" class="btn btn-primary">Save</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>

<script>

import vSelect from 'vue-select'

export default {
  name: 'modal-credits',
  props: ['currentSlice', 'modalTitle'],
  data () {
    return {
      subtitle: null,
      currentRole: null,
      currentName: null,
      credits: []
    }
  },
  methods: {
    addCredit: function () {
      this.credits.push({ role: this.currentRole, name: this.currentName });
      this.currentName = this.currentRole = null;
    },
    saveSlice: function () {
      this.currentSlice.name = 'Credits';
      this.currentSlice.css_class = 'credits';
      if(this.subtitle)
        this.currentSlice.content = '<h3>'+this.subtitle+'</h3>';
      if(this.credits.length)
      {
        this.currentSlice.content += '<ul>'; 
        for (var i = 0; i < this.credits.length; i++) {
          var credit = this.credits[i];
          var role = (credit.role) ? '<b>'+credit.role+'</b>' : '';
          var name = (credit.name) ? credit.name : '';
          var delim = (credit.role && credit.name) ? ' ' : '';
          this.currentSlice.content += '<li>'+role+delim+name+'</li>';
        };
        this.currentSlice.content += '</ul>';
      }
        
      this.$emit('save', 'modal-credits');
    },
    removeCredit: function (credit) {
      var index = this.credits.indexOf(credit);
      this.credits.splice(index, 1);
    },
  },
  components: {
    vSelect
  }
}
</script>

<style scoped lang="scss">
  .credits {
    text-align: center;
    h3 {
      font-family: 'CalibreMedium';
      font-size: 18px;
      color: #000000;
      letter-spacing: 1.46px;
      text-transform: uppercase;
      width: 100%;
    }
    ul {
      list-style-type: none;
      margin: 0; padding: 0;
      li {
        font-family: 'CalibreMedium';
        text-transform: uppercase;
        letter-spacing: 0;
        line-height: 30px;
      }
      li strong, li b {
        font-family: 'CardoItalic';
        font-style: italic;
        font-size: 16px;
        color: #999999;
        text-transform: none;
      }
    }
  }
  #removeCreditBtn {
    border: 1px solid #EEE;
    width: 18px;
    height: 18px;
    padding: 0;
  }
</style>
