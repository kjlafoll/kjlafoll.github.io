import json
from math import ceil, trunc
from random import *
from browser.local_storage import storage

data = {'subject_input': 'test',
		'schedule_input': 'Continuous',
		'trials_input': 10,
		'design_input': 'Delay',
		'habit_input': 4
		}

PARTIAL_PERCENT = 0.5

DELAY_TIMES = {
	"CS_MIN": 8,
	"CS_MAX": 12,
	"US_MIN": 4,
	"US_MAX": 4,
	"TI_MIN": 0,
	"TI_MAX": 0,
	"ITI_MIN": 5.5,
	"ITI_MAX": 10.5,
}

TRACE_TIMES = {
	"CS_MIN": 6,
	"CS_MAX": 6,
	"US_MIN": 4,
	"US_MAX": 4,
	"TI_MIN": 1,
	"TI_MAX": 4,
	"ITI_MIN": 3,
	"ITI_MAX": 8,
}

PRESENT_LIST = ['1019.jpg',
					'1300.jpg',
					'1930.jpg',
					'3071.jpg',
					'6370.jpg',
					'6550.jpg',
					'6560.JPG',
					'6830.jpg']

ABSENT_LIST = ['2280.jpg',
					'8010.jpg',
					'9120.jpg',
					'9210.jpg']

def mean(list):
	return int(sum(list)/len(list))

class LocalGame():

	def __init__(self):
		self.customsuccess = True
		self.pressactive = False
		self.trialnum = 1
		self.data = data
		if self.data['design_input'] == "Delay":
			self.overlap = True
		elif self.data['design_input'] == "Trace":
			self.overlap = False
		self.start()

	def start(self):
		self.generateTimeBank()
		self.generateUSBank()
		self.generateTrialBank()
		self.shuffleTrialBank()
		self.generateSchedules()
		self.generateHabituationTrials()

	def generateRange(self, n, r, s): #n = number, r = range, s = sum
		sum_n = s
		rest = []
		for x in range(n):
			restRange = [y*(n-x-1) for y in r]
			myRange = [sum_n-restRange[1], sum_n-restRange[0], r[0], r[1]]
			myRange.sort()
			myRange = [myRange[1], myRange[2]]
			myNumber = uniform(myRange[0], myRange[1])
			rest.append(myNumber)
			sum_n -= myNumber
		return(rest)

	def generateTimeBank(self):
		self.cs_time = []
		self.us_time = []
		self.ti_time = []
		self.iti_time = []
		if self.data['design_input'] == "Delay":
			timedict = DELAY_TIMES
		elif self.data['design_input'] == "Trace":
			timedict = TRACE_TIMES
		for x in range(trunc(int(self.data['trials_input'])/4)):
			self.cs_time.append(uniform(timedict["CS_MIN"], timedict["CS_MAX"]))
			self.us_time.append(uniform(timedict["US_MIN"], timedict["US_MAX"]))
			self.ti_time.append(uniform(timedict["TI_MIN"], timedict["TI_MAX"]))
			self.iti_time.append(uniform(timedict["ITI_MIN"], timedict["ITI_MAX"]))
		cs_sum = mean([timedict["CS_MIN"], timedict["CS_MAX"]])*int(self.data['trials_input'])/2 - sum(self.cs_time)
		us_sum = mean([timedict["US_MIN"], timedict["US_MAX"]])*int(self.data['trials_input'])/2 - sum(self.us_time)
		ti_sum = mean([timedict["TI_MIN"], timedict["TI_MAX"]])*int(self.data['trials_input'])/2 - sum(self.ti_time)
		iti_sum = mean([timedict["ITI_MIN"], timedict["ITI_MAX"]])*int(self.data['trials_input'])/2 - sum(self.iti_time)
		self.cs_time = self.cs_time + self.generateRange(ceil(int(self.data['trials_input'])/4), [timedict["CS_MIN"], timedict["CS_MAX"]], cs_sum)
		self.us_time = self.us_time + self.generateRange(ceil(int(self.data['trials_input'])/4), [timedict["US_MIN"], timedict["US_MAX"]], us_sum)
		self.ti_time = self.ti_time + self.generateRange(ceil(int(self.data['trials_input'])/4), [timedict["TI_MIN"], timedict["TI_MAX"]], ti_sum)
		self.iti_time = self.iti_time + self.generateRange(ceil(int(self.data['trials_input'])/4), [timedict["ITI_MIN"], timedict["ITI_MAX"]], iti_sum)
		shuffle(self.cs_time)
		shuffle(self.us_time)
		shuffle(self.ti_time)
		shuffle(self.iti_time)

	def generateUSBank(self):
		us_present_pool = PRESENT_LIST
		us_absent_pool = ABSENT_LIST
		us_present_runs = trunc((int(self.data['trials_input'])/2) / len(us_present_pool))
		us_absent_runs = trunc((int(self.data['trials_input'])/2) / len(us_absent_pool))
		us_present_remainder = int(self.data['trials_input'])/2 - us_present_runs*len(us_present_pool)
		us_absent_remainder = int(self.data['trials_input'])/2 - us_absent_runs*len(us_absent_pool)
		self.us_present_image = []
		self.us_absent_image = []
		for x in range(us_present_runs):
			self.us_present_image.append(sample(us_present_pool, k=len(us_present_pool)))
		self.us_present_image.append(sample(us_present_pool, k=int(us_present_remainder)))
		self.us_present_image = [item for sublist in self.us_present_image for item in sublist]
		for x in range(us_absent_runs):
			self.us_absent_image.append(sample(us_absent_pool, k=len(us_absent_pool)))
		self.us_absent_image.append(sample(us_absent_pool, k=int(us_absent_remainder)))
		self.us_absent_image = [item for sublist in self.us_absent_image for item in sublist]

	def generateTrialBank(self):
		self.ktrial_bank = []
		for x in ["CS+", "CS-"]:
			if x == "CS+":
				usbank = self.us_present_image
			elif x == "CS-":
				usbank = self.us_absent_image
			for y in range(int(int(self.data['trials_input'])/2)):
				self.ktrial_bank.append({
					"cs_duration": self.cs_time[y],
					"us_duration": self.us_time[y],
					"traceinterval_duration": self.ti_time[y],
					"iti_duration": self.iti_time[y],
					"cs_type": x,
					"us_stimulus_name": usbank[y],
					"overlap": self.overlap
					})

	def shuffleTrialBank(self):
		attempt = 0
		self.trial_bank = []
		self.utrial_bank = self.ktrial_bank
		while len(self.utrial_bank) > 0:
			ind = randint(0,len(self.utrial_bank)-1)
			chosen = self.utrial_bank[ind]
			if len(self.trial_bank) == 0:
				attempt +=1
				if chosen['cs_type'] == "CS+":
					continue
				else:
					self.trial_bank.append(chosen)
					self.utrial_bank.pop(ind)
			elif len(self.trial_bank) == 1:
				self.trial_bank.append(chosen)
				self.utrial_bank.pop(ind)
			else:
				if chosen['cs_type'] == self.trial_bank[-1]['cs_type'] and chosen['cs_type'] == self.trial_bank[-2]['cs_type']:
					cur_utrial_bank = [x['cs_type'] for x in self.utrial_bank]
					if all(x == cur_utrial_bank[0] for x in cur_utrial_bank):
						self.utrial_bank = self.ktrial_bank
						self.trial_bank = []
						if attempt > 10:
							break
					continue
				else:
					self.trial_bank.append(chosen)
					self.utrial_bank.pop(ind)
		if attempt > 10:
			self.start()

	def generateSchedules(self):
		num_reinforced = ceil(PARTIAL_PERCENT*(int(self.data['trials_input'])/2))
		num_partial = trunc((1-PARTIAL_PERCENT)*(int(self.data['trials_input'])/2))
		if self.data['schedule_input'] == "Continuous":
			for i, x in enumerate(self.trial_bank):
				self.trial_bank[i]['reinforced'] = 'True'
		elif self.data['schedule_input'] == "Partial":
			rlist = ['True']*int(num_reinforced-2) + ['False']*int(num_partial)
			shuffle(rlist)
			rlist = ['True'] + rlist + ['True']
			for i, x in enumerate(self.trial_bank):
				if x['cs_type'] == "CS+":
					self.trial_bank[i]['reinforced'] = rlist[0]
					rlist.pop(0)
				else:
					self.trial_bank[i]['reinforced'] = 'True'
		elif self.data['schedule_input'] == "Continuous-Partial":
			num_reinforced = int(num_reinforced/2)
			num_partial = int(num_partial/2)
			rlist = ['True']*(num_reinforced-1) + ['False']*num_partial
			shuffle(rlist)
			rlist = ['True'] + rlist
			for i, x in enumerate(reversed(self.trial_bank)):
				if x['cs_type'] == "CS+" and len(rlist)>0:
					self.trial_bank[i]['reinforced'] = rlist[0]
					rlist.pop(0)
				else:
					self.trial_bank[i]['reinforced'] = 'True'
		elif self.data['schedule_input'] == "Partial-Continuous":
			num_reinforced = int(num_reinforced/2)
			num_partial = int(num_partial/2)
			rlist = ['True']*(num_reinforced-1) + ['False']*num_partial
			shuffle(rlist)
			rlist = ['True'] + rlist
			for i, x in enumerate(self.trial_bank):
				if x['cs_type'] == "CS+" and len(rlist)>0:
					self.trial_bank[i]['reinforced'] = rlist[0]
					rlist.pop(0)
				else:
					self.trial_bank[i]['reinforced'] = 'True'
		us_absent_pool = ABSENT_LIST
		us_absent_runs = trunc(([x['reinforced'] for x in self.trial_bank].count('False')) / len(us_absent_pool))
		us_absent_remainder = [x['reinforced'] for x in self.trial_bank].count('False') - us_absent_runs*len(us_absent_pool)
		us_absent_image = []
		for x in range(us_absent_runs):
			us_absent_image.append(sample(us_absent_pool, k=len(us_absent_pool)))
		us_absent_image.append(sample(us_absent_pool, k=int(us_absent_remainder)))
		us_absent_image = [item for sublist in us_absent_image for item in sublist]
		for i, x in enumerate(self.trial_bank):
			if x['reinforced'] == 'False':
				self.trial_bank[i]['us_stimulus_name'] = us_absent_image[0]
				us_absent_image.pop(0)

	def generateHabituationTrials(self):
		if self.data['habit_input'] != "None":
			habitlist = ['CS+']*int(int(self.data['habit_input'])/2) + ['CS-']*int(int(self.data['habit_input'])/2)
			rhabitlist = [self.trial_bank[1]['cs_type'], self.trial_bank[0]['cs_type']]
			while len(habitlist) > 0:
				ind = randint(0,len(habitlist)-1)
				chosen = habitlist[ind]
				if chosen == rhabitlist[-1] and chosen == rhabitlist[-2]:
					if habitlist.count(chosen) == len(habitlist):
						habitlist = ['CS+']*int(int(self.data['habit_input'])/2) + ['CS-']*int(int(self.data['habit_input'])/2)
						rhabitlist = [self.trial_bank[1]['cs_type'], self.trial_bank[0]['cs_type']]
					continue
				else:
					rhabitlist.append(chosen)
					habitlist.pop(ind)
			rhabitlist = rhabitlist[2:]
			if self.data['design_input'] == "Delay":
				timedict = DELAY_TIMES
			elif self.data['design_input'] == "Trace":
				timedict = TRACE_TIMES
			for x in rhabitlist:
				self.trial_bank.insert(0, {
					"cs_duration": mean([timedict['CS_MIN'], timedict['CS_MAX']]),
					"us_duration": "NA - Habituation",
					"traceinterval_duration": mean([timedict['TI_MIN'], timedict['TI_MAX']]),
					"iti_duration": mean([timedict['ITI_MIN'], timedict['ITI_MAX']]),
					"cs_type": x,
					"us_stimulus_name": "NA - Habituation",
					"reinforced": "NA - Habituation",
					"overlap": "NA - Habituation"
					})

if __name__ == '__main__':
	setup = LocalGame()
	storage['mysetup'] = json.dumps(setup.trial_bank)
	print(storage['mysetup'])
