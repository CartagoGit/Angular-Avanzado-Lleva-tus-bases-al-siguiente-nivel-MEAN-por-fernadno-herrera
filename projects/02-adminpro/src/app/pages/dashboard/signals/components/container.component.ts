import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-container',
	standalone: true,
	imports: [CommonModule],
	template: `<div class="row">
		<div class="col-12">
			<div class="card">
				<div class="card-body">
					<div class="row">
						<div class="col-12">
							<div class="card">
								<ng-content></ng-content>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>`,
	styles: [],
})
export class ContainerComponent {}
