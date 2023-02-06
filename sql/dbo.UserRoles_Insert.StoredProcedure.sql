CREATE proc [dbo].[UserRoles_Insert]
									@batchRoleIds [dbo].[UserRoles_BatchInsert] READONLY
									,@UserId int


as


/*

		Declare @batchRoleIds [dbo].[UserRoles_BatchInsert]
		Insert into @batchRoleIds (Id)
		Values(2),(3)

		Declare @UserId int = '1'

		Execute [dbo].[UserRoles_Insert]
											@batchRoleIds
											,@UserId

		Select *
		From [dbo].[UserRoles]
		Where UserId = @UserId






		Select *
		From dbo.Users

		Select *
		From dbo.Roles

*/


BEGIN


		INSERT INTO [dbo].[UserRoles]
				   
		Select	@UserId
				,br.Id

		From @batchRoleIds as br



END
GO
