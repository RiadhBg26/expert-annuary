import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { from } from 'rxjs';
import { SkillModelServer, SkillResponse } from 'src/models/skillModel';
import { SkillService} from '../../services/skill.service'
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skillName: string;
  skill: SkillModelServer;
  skillList: SkillModelServer[] = [];

  constructor(private skillService: SkillService) { }

  ngOnInit(): void {
    this.getSkills()
  }
  getSkills() {
    this.skillService.getSkills().subscribe( data => {
      this.skillList = data.skills
    })
  }
  addSkill() {
    let skill = { skill: this.skillName}
    this.skillService.postSkill(skill).subscribe(skill => {
        console.log(skill);
    })
    this.skillName = ''
  }

  deleteSkill(id) {
    this.skillService.deleteSkill(id).subscribe( res => {
      console.log(res);      
      this.skillService.getSkills().subscribe(res => {
        this.skillList = res.skills
        this.skillList.slice(id, 1)
      })
    })
  }
  clear() {
    this.skillName = ''
  }
}
